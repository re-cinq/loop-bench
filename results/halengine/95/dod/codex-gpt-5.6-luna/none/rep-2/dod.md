# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real caller seam, and an AI provider can reject with arbitrary values through its `sendMessage` stream.

## Done when these pass

- [ ] **calls onError for every non-Error rejection and preserves the caller rejection** — string, plain-object, and `undefined` provider rejections invoke `onError` once with an `Error` whose `cause` is the original value, while the caller receives the original value unchanged.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [x] Replace the `instanceof Error` gate so every rejection reaches `onError`, wrapping non-`Error` values with their original value as `cause`.
- [x] Keep the original rejection unchanged at the caller boundary and preserve the existing same-instance behavior for `Error` rejections.
- [x] Update the config-hooks spec and CHANGELOG to describe the new guarantee for existing consumers.

## Out of scope

- `beforeSession` escaping the `try` block.
- Usage accounting across tool rounds (HALEngine#93).