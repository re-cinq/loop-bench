# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator lifecycle seam already accepts an `onError` hook and handles provider stream rejections; the acceptance test exercises string, plain object, and undefined rejections directly through `createChatOrchestrator`.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — Calls onError once with an Error wrapping the rejection (with cause set to the original value) for string, plain object, and undefined rejections, while preserving the original rejection value to the caller.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections in a new Error with cause set to the original rejection in chatOrchestrator.ts before calling onError
- [ ] Preserve caller re-throw of the original rejection unchanged in chatOrchestrator.ts
- [ ] Keep existing onError tests passing unedited to guarantee Error instances are passed directly rather than wrapped
- [ ] Add CHANGELOG entry documenting the onError behavior change and migration note

## Out of scope

- `beforeSession` escaping the `try` (HALEngine#94, resolved separately)
- usage accounting across tool rounds (HALEngine#93)