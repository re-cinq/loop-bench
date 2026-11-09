# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator's public message entry point and lifecycle hooks exercise the shared catch path directly. A throwing hook supplies real rejection values without a provider double.

## Done when these pass

- [ ] **reports every rejection to onError while preserving the caller value** — Strings, objects, and undefined reach the hook as Error causes; existing Errors retain identity and callers receive the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Call `onError` once for every caught rejection, wrapping non-Error values with their original value as cause and rethrowing the original.
- [ ] Add a consumer-facing changelog entry describing the changed hook behavior.
- [ ] Keep the existing Error-path tests unedited and pass the repository CI checks.

## Out of scope

- Changes to `beforeSession` placement and usage accounting across tool rounds.