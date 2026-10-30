# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`.

**Strategy: `direct`** — `createChatOrchestrator` and its public `processMessage` method provide a real seam through the provider rejection path and the hook boundary.

## Done when these pass

- [ ] **reports every non-Error rejection to onError without changing the caller rejection** — A string, plain object, or `undefined` rejection calls `onError` once with an `Error` whose cause is the original value, while the caller receives that original value unchanged.
      `src/orchestration/nonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Normalize every non-`Error` rejection into an `Error` with the original rejection as its cause before calling `onError`.
- [ ] Preserve an existing `Error` instance and rethrow every original rejection unchanged.
- [ ] Replace the spec's recorded flaw with the guaranteed behavior and document the consumer-visible change in the changelog.

## Out of scope

- `beforeSession` escaping the orchestrator error boundary and usage accounting across tool rounds.