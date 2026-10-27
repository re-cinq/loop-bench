# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — the existing `afterModelResponse` hook is the real seam, and the orchestrator already executes provider calls through a tool loop. The acceptance tests drive that loop with a scripted provider and observe the usage delivered to the hook; no new seam or double is needed.

## Done when these pass

- [ ] **sums usage from every provider call in two tool rounds** — a scripted turn with two tool rounds and three provider calls delivers the component-wise sum to `afterModelResponse`, not only the final call.
      `src/orchestration/usageAggregation.acceptance.test.ts`

- [ ] **counts reporting rounds around a silent round and leaves an entirely silent turn undefined** — missing usage on one round neither erases reported rounds nor creates `NaN`, and no reported round remains `undefined`.
      `src/orchestration/usageAggregation.acceptance.test.ts`

## Facets

- [ ] Red: the two acceptance tests fail because the hook receives only the final provider call's usage.
- [ ] Green: accumulate each reported provider-call usage and pass the total to `afterModelResponse`.
- [ ] Type: name the hook argument as the total usage so the public signature makes the sum semantics explicit without `any`.
- [ ] Preserve the existing no-tool test `receives collected response text and usage`; its single provider-call usage must remain unchanged and the test file stays unedited.
- [ ] Replace the spec's under-counting statement with the summed-usage behavior and add the CHANGELOG migration note for existing consumers.

## Out of scope

- The audit entry or billing record that consumes the hook.
- Token accounting for anything other than provider calls made by the orchestrator.
- The `stop` chunk's usage shape, provider-specific usage production, and any workspace-wide build, lint, typecheck, or formatter behavior.