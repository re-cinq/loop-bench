# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` returns an orchestrator whose `processMessageStream` invokes `OrchestratorHooks.onError` inside its `catch` block. Acceptance tests can install an `onError` hook, supply a provider rejecting with a non-Error value, and assert through `processMessage` that `onError` receives an `Error` wrapping the rejection as its cause while the caller receives the original rejection unchanged.

## Done when these pass

- [ ] **calls onError with an Error wrapping a string rejection as cause, and re-throws the string** — a provider rejecting with a string calls `onError` once with an `Error` whose `cause` is that string, and the caller receives the original string rejection unchanged.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

- [ ] **calls onError with an Error wrapping a plain object rejection as cause, and re-throws the object** — a provider rejecting with a plain object calls `onError` once with an `Error` whose `cause` is that object, and the caller receives the original object rejection unchanged.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

- [ ] **calls onError with an Error wrapping an undefined rejection as cause, and re-throws undefined** — a provider rejecting with `undefined` calls `onError` once with an `Error` whose `cause` is `undefined`, and the caller receives the original `undefined` rejection unchanged.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections in `new Error(..., {cause: error})` before invoking `hooks.onError` in `src/orchestration/chatOrchestrator.ts`.
- [ ] Ensure the original rejection is re-thrown unchanged at the orchestrator boundary.
- [ ] Confirm rejections that are already `Error` instances reach `onError` unwrapped, leaving existing tests in `src/orchestration/chatOrchestrator.test.ts` green without modification.
- [ ] Update `CHANGELOG.md` documenting that non-Error rejections now trigger `onError` with a wrapped `Error`.

## Out of scope

- `beforeSession` escaping the `try` block (its own issue, HALEngine#94).
- Usage accounting across tool rounds (HALEngine#93).