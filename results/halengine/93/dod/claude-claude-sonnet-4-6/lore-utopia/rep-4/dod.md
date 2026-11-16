# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — The seam already exists: `afterModelResponse` in `OrchestratorHooks` is called with `lastUsage` at `chatOrchestrator.ts:148`. The acceptance tests call `createChatOrchestrator` directly with a scripted multi-round provider and assert on what the hook receives, so no new entry point is needed.

## Done when these pass

- [ ] **sums usage over two tool rounds so a deployer sees the full turn cost** — `afterModelResponse` receives the sum of `UsageMetadata` across all three provider calls in a two-tool-round turn, not the last call's value alone.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

- [ ] **counts rounds that reported when an intermediate round reports no usage** — when one of three rounds returns no usage, the hook still receives the sum of the two that did, without NaN or the first being silently dropped.
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Change `lastUsage = outcome.usage ?? lastUsage` in the round loop (`chatOrchestrator.ts:117`) to accumulate: add each round's tokens to a running total, keeping `undefined` only while no round has reported yet.
- [ ] Update the `afterModelResponse` hook signature so the third argument name or type makes it unambiguous that it is a turn total, not a single-call value (criterion 4 in the ticket — the TypeScript compiler validates this via CI's build step).
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the recorded under-counting line with the new accumulated behaviour.
- [ ] Add a CHANGELOG entry stating what an existing consumer will now record (the full turn cost instead of only the last round).
- [ ] Confirm the existing test `'receives collected response text and usage'` (`chatOrchestrator.test.ts:236`) still passes without modification — it covers the no-tool-call path.

## Out of scope

- Audit entries or billing records — those are consumer responsibilities.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The shape of the `stop` chunk's own `usage` field, which providers already populate.
- Deciding between "sum only" vs "sum plus per-round breakdown" — that is the implementer's design decision; the tests pin the minimum required behaviour (the sum is correct).