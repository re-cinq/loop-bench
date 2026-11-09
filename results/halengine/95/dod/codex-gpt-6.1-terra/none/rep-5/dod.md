# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator's public `processMessage` path reaches the catch through a rejecting lifecycle hook, with a real provider configured. The catch handles provider and hook rejections alike.

## Done when these pass

- [ ] **reports every rejection to onError without changing what the caller receives** — String, object and undefined rejections are wrapped with their original cause, an Error retains its identity, and each original rejection reaches the caller.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` once for non-Error rejections, wrapping them with their original value as cause, and retain Error identity and original caller rejection.
- [ ] Replace the recorded flaw in the spec with the guarantee and document the consumer-visible change in the changelog.
- [ ] Keep the existing Error tests unchanged and green, and pass the repository's CI checks.

## Out of scope

- Usage accounting across tool rounds and unrelated lifecycle changes.