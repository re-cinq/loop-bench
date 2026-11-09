# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes real hooks and `processMessage` is the real entry point, so a throw from `beforeSession` is observable through it today. No doubles are needed; the recording-hook style of `src/orchestration/chatOrchestrator.test.ts` is mirrored.

## Done when these pass

- [ ] **runs onError with the session and the thrown error, and still rejects the caller** — a throw from `beforeSession` reaches the existing `catch`: `onError` receives the session and the same error instance, and the caller still gets the rejection unchanged. Fails today with `sameError: false, sameSession: false` because `onError` never fires.
  `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`
- [ ] **runs afterSession after onError** — the existing `finally` also runs on this path, so `afterSession` fires after `onError`. Fails today with `callOrder: ['beforeSession']`: neither hook runs.
  `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

Run them with the jest binary the repo's `npm test` wraps, naming the file (the Bash hook rejects a bare `npm test`):

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts
```

## Facets

- [x] Red: both acceptance tests fail because the `beforeSession` call sits above the `try` in `src/orchestration/chatOrchestrator.ts` — committed here.
- [x] Spec: `specs/hal-engine-config-hooks/spec.md` — the recorded-flaw bullet is replaced by a "When `beforeSession` throws" guarantee citing both tests; the measured-semantics intro now reads "two properties". Done in this commit, so the only spec edit a later round owes is wording polish.
- [ ] Green: move `await hooks.beforeSession(session)` inside the `try`. The non-throwing path is unchanged, so the existing hook tests stay green and UNEDITED — acceptance criterion 4 is that pin, not a new test: the `full lifecycle order` and `error path calls onError then afterSession` tests in `src/orchestration/chatOrchestrator.test.ts`, the lifecycle-order and hook-forwarding tests in `src/config.test.ts`.
- [ ] `CHANGELOG.md`: an `[Unreleased]` → `Changed` entry saying what changes for an existing consumer — `onError` and `afterSession` now run when `beforeSession` throws, and the `finally`'s session save runs with them, so an `afterSession` cleanup hook must tolerate a session the turn never touched (no user input read or rewritten, nothing streamed). CI's changelog gate (`scripts/check-changelog.sh`) demands this; it is the facet most easily forgotten.
- [ ] The question the ticket says to decide explicitly is decided as: `afterSession` DOES run after a failed `beforeSession`, and what a hook may assume about how much of the turn happened is stated in the spec statement. Keep that decision; do not re-litigate it.

## Out of scope

- The `instanceof Error` gate on `onError` — a rejection that is not an `Error` still bypasses `onError` even after this fix; its own issue. Both tests throw a real `Error` so they stay on the right side of that gate.
- Usage accounting across tool rounds (HALEngine#93), the `afterModelResponse`/`lastUsage` bullet in the same measured-semantics section.
- Any change to the hook fire order on the success path, or to what `beforeSession` can reach.