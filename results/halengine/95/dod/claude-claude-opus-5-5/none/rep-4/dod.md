# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and a provider whose `sendMessage` throws is the existing seam the orchestrator tests already use; the test drives a non-`Error` rejection through it and observes `onError` and the caller's rejection.

## Done when these pass

- [ ] **calls onError once with an Error wrapping a string, object or undefined rejection as its cause, and rethrows the original** — for a provider rejecting with a string, a plain object and `undefined`, `onError` fires exactly once with an `Error` that has an own `cause` equal to the original value, and the caller receives the original value (same reference) as the rejection
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In the `catch` of `src/orchestration/chatOrchestrator.ts`, call `onError` for every rejection: an `Error` as-is (same instance), anything else wrapped as `new Error(<message>, {cause: error})`; keep `throw error` rethrowing the original
- [ ] Existing `src/orchestration/chatOrchestrator.test.ts` tests stay green and unedited (they pin that an `Error` reaches `onError` as the same instance)
- [ ] Remove the "Measured semantics — out of scope" section of `specs/hal-engine-config-hooks/spec.md` (the recorded flaw is superseded by the new statement that cites the acceptance test)
- [ ] CHANGELOG entry: `onError` now also fires for non-`Error` rejections, receiving a wrapping `Error` whose `cause` is the raw value; the value rethrown to the caller is unchanged

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changing the shape of what the caller receives on rejection