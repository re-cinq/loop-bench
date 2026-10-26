# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. Currently it is handed the `lastUsage` local, which for a turn that called tools is the last leg of several, and the earlier rounds are not counted anywhere. For a turn that called tools, the hook should receive usage covering every provider call in that turn, not just the last.

**Strategy: `direct`** — The `afterModelResponse` hook is called from a clear seam at the end of the message processing loop in `chatOrchestrator.ts`. The orchestrator already collects usage from each round in a local variable; the change is to accumulate usage across rounds instead of keeping only the last, then pass the accumulated total.

## Done when these pass

- [ ] **accumulates usage from every tool round, not just the last** — A turn driven through two tool rounds with known, different token counts in each round receives the sum of all rounds
  `src/orchestration/usage-accumulation.acceptance.test.ts`

- [ ] **reports the single round usage unchanged when only one round runs** — A turn with no tool calls reports exactly the same usage as today, ensuring backward compatibility
  `src/orchestration/usage-accumulation.acceptance.test.ts`

- [ ] **accumulates usage when some rounds report and others do not** — A turn where some rounds report usage and others don't correctly sums only the reported rounds, not undefined or NaN
  `src/orchestration/usage-accumulation.acceptance.test.ts`

- [ ] **reports undefined when no round reports usage** — A turn where no round reports any usage receives undefined, matching the existing no-tool behavior
  `src/orchestration/usage-accumulation.acceptance.test.ts`

- [ ] **accumulates usage from three consecutive tool rounds** — Multi-round accumulation works correctly across more than two rounds
  `src/orchestration/usage-accumulation.acceptance.test.ts`

## Facets

- [ ] Accumulate usage fields (inputTokens, outputTokens, totalTokens) across every round where usage was reported
- [ ] Pass the accumulated total to `afterModelResponse` instead of only the last round's usage
- [ ] Ensure the type signature makes the behavior unambiguous (current `UsageMetadata | undefined` parameter reflects the accumulated sum, not per-round granularity)
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to document the new behavior where accumulated usage is passed, replacing the line about under-counting
- [ ] Add a CHANGELOG entry stating the behaviour change in what an existing consumer will record (tool-heavy turns now include all rounds' usage)
- [ ] All existing tests remain green, confirming backward compatibility for single-round cases

## Out of scope

- Changing the `UsageMetadata` type structure itself — the ticket decided to accumulate into the same `UsageMetadata` shape rather than adding per-round breakdown
- The audit entry or billing record implementation itself, which is a consumer's concern
- Token accounting for anything other than provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate