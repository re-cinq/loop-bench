# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` exposes the failing provider-to-hook-to-caller path. The acceptance test drives it with real rejected async generators and observes both boundaries.

## Done when these pass

- [ ] **reports every rejection to onError without changing what the caller receives** — String, plain-object, and `undefined` rejections call the hook exactly once with an `Error` preserving the raw value as `cause`, while an existing `Error` remains the same instance and every caller sees the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Replace the `instanceof Error` gate with normalization for every rejection before calling `onError`.
- [ ] Preserve an existing `Error` instance and rethrow the original rejection after the hook returns.
- [ ] Add an Unreleased changelog entry explaining the new hook notification behavior for existing consumers.

## Out of scope

- Moving `beforeSession` relative to the orchestration `try` boundary.
- Usage accounting across tool rounds (HALEngine#93).