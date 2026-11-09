# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes hooks and an `AIProvider`, and a provider whose `sendMessage` generator throws a non-`Error` drives the `catch` at `src/orchestration/chatOrchestrator.ts:150` through the real entry point today. The tests below call it and fail on behaviour.

## Done when these pass

- [ ] **reports a string rejection to onError once, wrapped with the string as its cause, while the caller still receives the string** — RED today: `reports` comes back `[]` because the `instanceof Error` gate drops the rejection from `onError`, while `outcome` already matches (the caller receives the string). Validates the first acceptance criterion.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports an object and an undefined rejection the same way, each wrapped with the original as its cause** — RED today for the same reason, for a plain object and for `undefined`. Validates the second acceptance criterion.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands an Error rejection to onError as that same instance, not a wrapper** — GREEN today by design: this is the regression guard for the third acceptance criterion's "same instance, not a wrapper" half, which the existing tests do not pin (they assert on `error.message`, which a wrapper carrying the same message would satisfy). The "pinned by the existing tests remaining unedited" half is carried by `src/orchestration/chatOrchestrator.test.ts` staying unedited.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

Run them, and nothing else:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

## Facets

- [ ] In the `catch` in `src/orchestration/chatOrchestrator.ts` (the `instanceof Error` gate), call `hooks.onError` for every rejection: whatever is not already an `Error` gets wrapped in one preserving the original as `cause`; an `Error` is passed through as-is. The re-thrown value stays exactly what it is today — the first two tests go green, the third stays green.
- [ ] `CHANGELOG.md` gains an entry under `## [Unreleased]` saying what changes for an existing consumer: `onError` now fires for rejections that are not `Error`s, with the raw value reachable as `cause`. CI's changelog gate does not fire until a non-test file under `src/` changes, so this lands with the code change above, not with the tests alone.
- [ ] `specs/hal-engine-config-hooks/spec.md` — done already: the recorded-flaw section was replaced by the three new guarantee statements, each citing its test. Nothing left here unless the wording of the guarantee shifts.
- [ ] The ticket's full gate set stays judgeable by CI: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check`.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- The `onError` signature stays `(session: ChatSession, error: Error)` — the wrapping exists precisely so no hook type changes.
- Anything that changes the value the caller receives at the rejection boundary.