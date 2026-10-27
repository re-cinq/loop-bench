# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point and accepts a provider whose async stream can reject with any JavaScript value. The acceptance test observes both the hook argument and the caller-visible rejection through that path.

## Done when these pass

- [ ] **calls onError for a rejection with a string, plain object, or undefined and preserves the caller rejection** — every non-`Error` rejection invokes `onError` once with an `Error` whose `cause` is the original value, while the caller receives that exact original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Add the direct acceptance test for non-`Error` provider rejections.
- [ ] Preserve the existing unedited Error-path tests proving an `Error` reaches `onError` as the same instance.
- [ ] Replace the recorded-flaw spec line with the new guarantee and update the CHANGELOG for existing consumers.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds remain separate issues.
- Production implementation, changelog wording, and any unrelated hook behavior are not defined by this acceptance test.