# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the real entry point, and installing hook functions through `options.hooks` observes the failure path directly. The acceptance test calls it today and fails on the missing behaviour, not on a missing module.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws, and still rejects the caller** — a `beforeSession` throw reaches `onError` with the session and the thrown error, `afterSession` runs after it, the provider is never reached, and the caller still sees the same rejection (today the hooks never fire: `callOrder` stops at `beforeSession`)
  `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

Run just this file:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts
```

## Facets

- [ ] Move the `beforeSession` await from above the `try` to the first statement inside it in `src/orchestration/chatOrchestrator.ts`, so the throw reaches the existing `catch` (`onError`, then rethrow) and `finally` (`afterSession`, then the session save). That is the whole production change.
- [ ] Non-throwing `beforeSession` behaves exactly as today: the existing `src/orchestration/chatOrchestrator.test.ts` (`called before anything else`, `full lifecycle order`) and `src/config.test.ts` lifecycle-order tests stay green and UNEDITED — they are the pin for that acceptance criterion, so do not touch them.
- [ ] The spec guarantee this test validates is already written, with the citation, in `specs/hal-engine-config-hooks/spec.md` § "A failed beforeSession"; the recorded-flaw bullet it replaces is already removed from § "Measured semantics — out of scope" and that section's intro now reads "These two properties". Nothing further is owed there unless the move shifts the two `chatOrchestrator.ts#Lnn` source links left in that section — then run `node scripts/repoint-spec-anchors.mjs`.
- [ ] The CHANGELOG `### Fixed` entry under `## [Unreleased]` is already drafted in this commit; adjust its wording only if the shipped behaviour differs from it. The commit that touches `src/orchestration/chatOrchestrator.ts` must keep touching `CHANGELOG.md` (CI gate).

## Out of scope

- The `instanceof Error` gate on `onError` in the same `catch` — its own issue.
- Usage accounting across tool rounds (`lastUsage` not a sum) — HALEngine#93.
- A hook-visible signal telling `afterSession` the session never started: explicitly decided against here (the ticket's decide-and-record question). `afterSession` fires with nothing in its arguments distinguishing "never started" from "failed mid-turn", and the spec records that a deployer who needs the distinction keeps it in its own `beforeSession`.