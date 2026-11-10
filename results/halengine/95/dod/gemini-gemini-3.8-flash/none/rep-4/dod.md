# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists. `createChatOrchestrator` accepts `OrchestratorHooks.onError` and catches turn errors during `processMessageStream`. An acceptance test can install an `onError` hook, drive `processMessage` with a provider that rejects with non-`Error` values, and observe that `onError` is skipped today.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error preserving its cause and still rejects to the caller** — When a provider rejects with a non-`Error` value (a string, a plain object, or `undefined`), `onError` is called once with an `Error` instance whose `cause` is that original value, and the caller receives the original rejection unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, update the `catch` block to invoke `hooks.onError` for every rejection, wrapping any value that is not an `instanceof Error` in a new `Error` with `{cause: error}` while re-throwing the original value unchanged.
- [ ] Confirm existing tests verifying `onError` when an `Error` instance is rejected/thrown continue to pass without modification, receiving the exact same instance rather than a wrapper.
- [ ] Document the updated `onError` behaviour in `CHANGELOG.md` under Changed.

## Out of scope

- `beforeSession` escaping the `try` block (owned by issue #94).
- Usage accounting across tool rounds (owned by issue #93).