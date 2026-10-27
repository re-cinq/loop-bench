# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider and `onError` hook, so the acceptance test exercises the production caller path without mocks or stubs.

## Done when these pass

- [ ] **wraps every non-Error rejection for onError while preserving the caller rejection** — string, plain-object, and `undefined` provider rejections invoke `onError` once with an `Error` whose `cause` is the original value, while the caller receives that original value unchanged.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Add the non-`Error` rejection acceptance test and make its wrapper/cause and propagation assertions green.
- [ ] Keep the existing `called with session and error when stream fails` test unedited so an existing `Error` reaches `onError` as the same instance.
- [ ] Replace the measured-flaw prose in the config-hooks spec with the guarantee exercised by the acceptance test.
- [ ] Add a CHANGELOG entry describing the new `onError` behavior for existing consumers.
- [ ] Leave `beforeSession` escaping the `try` and usage accounting across tool rounds out of scope.

## Out of scope

- Changing the rejection value observed by the caller.
- Changing behavior for rejections that are already `Error` instances.
- The `beforeSession` and usage-accounting issues named in the ticket.