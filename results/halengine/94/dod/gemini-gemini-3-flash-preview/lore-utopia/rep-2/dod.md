# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The `ChatOrchestrator` entry point `processMessageStream` (and `processMessage`) can be called with hooks that throw in `beforeSession` to verify that `onError` and `afterSession` are called.

## Done when these pass

- [x] **runs onError and afterSession when beforeSession throws** — Verifies that a throw in `beforeSession` triggers the error and cleanup hooks.
      `src/orchestration/beforeSessionError.acceptance.test.ts`

- [x] **does not run intermediate hooks when beforeSession throws** — Verifies that intermediate hooks are skipped when `beforeSession` fails.
      `src/orchestration/beforeSessionError.acceptance.test.ts`

## Facets

- [x] Create `src/orchestration/beforeSessionError.acceptance.test.ts` with failing tests.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee and move it out of "out of scope".
- [x] Update spec links to point to the new test file.
- [x] Remove `src/orchestration/chatOrchestrator.acceptance.test.ts` if redundant.

## Out of scope

- `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).