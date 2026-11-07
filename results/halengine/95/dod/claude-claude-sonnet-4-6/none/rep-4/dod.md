# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` accepts an `onError` hook through `ChatOrchestratorOptions.hooks`, and the catch block at `src/orchestration/chatOrchestrator.ts:L150` is the exact gate that needs to change.

## Done when these pass

- [ ] **calls onError with a wrapped Error when the provider rejects with a string, and re-throws the original string** — a provider that throws a string calls `onError` once with an `Error` whose `cause` is that string; the caller's rejection is the original string unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with a wrapped Error when the provider rejects with a plain object, and re-throws the original object** — same contract for a plain object rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with a wrapped Error when the provider rejects with undefined, and re-throws undefined** — same contract for `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change the `instanceof Error` gate in the catch block (`chatOrchestrator.ts:L150`) to call `onError` for every rejection, wrapping non-Error values in `new Error` with the original as `cause`
- [ ] Re-throw the original value unchanged (not the wrapper) so callers see no behaviour change
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee and add VALIDATED_BY links pointing to the acceptance tests
- [ ] Add a CHANGELOG entry describing the change for existing consumers

## Out of scope

- `beforeSession` escaping the outer `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Any change to the shape of the re-thrown value at the caller boundary