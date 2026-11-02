# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes real lifecycle hooks and both message entry points. An installed `beforeModelResponse` hook supplies actual rejections to the same catch that handles provider failures, without mocking or stubbing a provider.

## Done when these pass

- [ ] **reports every rejection as an Error while preserving the caller rejection** — String, object, and `undefined` rejections each notify once with an Error carrying the original cause; existing Errors retain identity, and both callers receive the original rejection unchanged.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error values only for `onError`, preserving their cause and rethrowing the original value; keep existing Error instances and existing tests unchanged.
- [ ] Confirm the linked spec guarantee and add a CHANGELOG migration note explaining that existing consumers now receive previously omitted failures.
- [ ] Pass the acceptance test and CI's build, tests, typecheck, eslint, and formatting gates.

## Out of scope

- Changes to `beforeSession` placement, usage accounting across tool rounds, or hook-failure precedence.
- Provider implementation or network behavior: the acceptance test targets the shared rejection-handling seam through an installed hook.