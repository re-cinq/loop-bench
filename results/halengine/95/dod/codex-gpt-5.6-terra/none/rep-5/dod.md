# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `processMessage` entry point, which can receive provider rejections and invoke the configured hook without a test double.

## Done when these pass

- [ ] **calls onError with an Error preserving each non-Error cause while rethrowing the original rejection** — string, plain-object, and undefined provider rejections each notify `onError` once with an Error whose cause is the original value, while callers receive that same value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error rejections for `onError` while preserving their original values at the caller boundary.
- [ ] Replace the config-hooks spec's recorded flaw with the guaranteed non-Error rejection behavior and update the changelog for consumers.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.