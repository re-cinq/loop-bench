# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the existing public seam through which a real provider rejection, the `onError` hook argument, and the caller-visible rejection can all be observed together.

## Done when these pass

- [ ] **calls onError once with a wrapping Error and rethrows each original provider rejection** — pins string, plain-object, and `undefined` provider rejections: the hook receives one wrapping `Error` whose `cause` is the original value, while the caller receives that original value unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize every non-`Error` rejection to an `Error` with the original value as `cause` only for the `onError` hook.
- [ ] Preserve an existing `Error` instance and preserve every original rejection at the caller boundary.
- [ ] Replace the spec's recorded flaw with the guaranteed rejection semantics.
- [ ] Add the consumer-visible hook behavior change to the CHANGELOG.

## Out of scope

- `beforeSession` escaping the orchestrator's `try`, usage accounting across tool rounds, and changes to the shape of the rejection observed by the caller.