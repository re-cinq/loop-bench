# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — The `afterModelResponse` hook is already called from line 148 in `chatOrchestrator.ts`, and the acceptance tests can call the real orchestrator entry point directly to verify accumulated usage reporting.

## Done when these pass

- [ ] **accumulates usage from two tool rounds into a single sum** — A turn with two tool rounds reports the sum of both rounds' usage to the hook
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

- [ ] **handles a middle round with no usage report by summing the rounds that reported** — When a middle round reports no usage, the remaining rounds are summed correctly
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

- [ ] **reports the same usage for a turn with no tool calls as it does today** — Non-tool turns continue to report the exact same usage (ensures backward compatibility for the common case)
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

- [ ] **reports undefined when no round reports usage** — Turns where no round reports usage report undefined, never NaN or null
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across all rounds in `chatOrchestrator.ts` instead of keeping only the last round
- [ ] Add or update type signature for `afterModelResponse` to make the accumulated sum unambiguous (decision on sum vs. sum+breakdown to be made in implementation)
- [ ] Update `specs/hal-engine-config-hooks/spec.md` line 28 to document the new behavior
- [ ] Add CHANGELOG entry documenting the behavior change (MINOR bump, existing consumers may record different totals)

## Out of scope

- The audit entry or billing record itself (consumer's concern)
- Token accounting for anything other than provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape