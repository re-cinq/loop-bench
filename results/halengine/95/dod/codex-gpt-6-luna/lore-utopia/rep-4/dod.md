# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes `processMessage` and accepts an `AIProvider`, so a provider rejecting with real string, object, and undefined values directly exercises the existing catch path.

## Done when these pass

- [ ] **calls onError for non-Error provider rejections and preserves original caller values** — checks string, plain object, and undefined rejections are each passed once to `onError` as an `Error` with the original `cause`, while each original value still reaches the caller; also asserts an existing `Error` reaches the hook by identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Add a separate acceptance test through `processMessage` and the real provider entry point; confirm it fails because `onError` is skipped for non-Error rejections.
- [ ] Wrap non-Error values for `onError`, preserve existing `Error` identity, and keep rethrowing the original rejection.
- [ ] Replace the measured-flaw statement in the config-hooks spec with the guarantee and update the changelog with the consumer-visible change.
- [ ] Keep the existing `onError` and lifecycle tests unchanged and passing.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).