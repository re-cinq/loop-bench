# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes `processMessage` with real lifecycle hooks, so the test can exercise the reported failure through the public orchestration seam.

## Done when these pass

- [ ] A `beforeSession` failure remains the caller's rejection and invokes `onError` and `afterSession` with their expected arguments.
      `src/orchestration/beforeSession-failure.acceptance.test.ts`

## Facets

- [ ] Make the acceptance test pass by bringing `beforeSession` under the existing catch/finally lifecycle.
- [ ] Replace the spec's measured-flaw statement with the guarantee and document what `afterSession` can infer after `beforeSession` fails.
- [ ] Add the consumer-facing behavior change to the changelog.

## Out of scope

- Changes to the `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Changes to behavior when `beforeSession` completes normally.