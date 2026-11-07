# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — A seam exists in `createChatOrchestrator` which accepts `hooks`. We can provide a `beforeSession` hook that throws and verify that `onError` and `afterSession` are called.

## Done when these pass

- [x] **runs onError and afterSession when beforeSession throws** — Verifies that both hooks fire when beforeSession rejects, and that the error propagates to the caller.
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the `try` block in `chatOrchestrator.ts`.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [x] Add entry to `CHANGELOG.md`.

## Out of scope

- `instanceof Error` gate on `onError`.
- usage accounting across tool rounds (HALEngine#93).