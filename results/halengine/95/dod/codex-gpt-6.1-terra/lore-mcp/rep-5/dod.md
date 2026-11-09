# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator's public `processMessage` entry point accepts a provider and hooks, so provider rejections and hook observations can be exercised directly.

## Done when these pass

- [ ] **reports every provider rejection to onError while preserving the caller rejection** — String, object and undefined rejections are wrapped with their original cause, existing Errors retain identity, and all caller rejections remain unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` once for every caught rejection, wrapping non-Errors with the original value as cause and preserving Error identity and the caller's rejection.
- [ ] Update the spec's recorded flaw to the guarantee and describe the consumer-facing change in the CHANGELOG.

## Out of scope

- Usage accounting across tool rounds and unrelated lifecycle changes.