# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already exposes the real catch path through its lifecycle hooks. The test installs a rejecting `afterModelResponse` hook after the shipped offline provider runs, without replacing or stubbing implementations; it checks all three non-Error values and an Error identity control together.

## Done when these pass

- [ ] **notifies onError once for every rejection while preserving the caller rejection** — strings, plain objects, and undefined each produce exactly one Error notification with their original cause; an existing Error retains identity and all caller rejections retain identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error rejections in the shared catch (including provider failures), call onError once, and rethrow the original value.
- [ ] Keep the existing Error-path tests unedited and passing; retain the new spec guarantee and document the consumer-visible change in CHANGELOG.md.
- [ ] Have CI verify build, tests, typecheck, ESLint with zero warnings, and Prettier.

## Out of scope

- beforeSession placement, usage accounting across tool rounds, and failures thrown by onError itself.
- Provider-specific error translation and changes to the caller's rejection shape.