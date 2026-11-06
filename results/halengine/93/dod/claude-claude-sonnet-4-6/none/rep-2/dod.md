# Definition of Done

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` accepts a scripted `AIProvider` and an `OrchestratorHooks` whose `afterModelResponse` records what the orchestrator passed. Drive two or three tool rounds with known per-round token counts and assert the hook receives their sum.

## Done when these pass

- [ ] **reports the sum of token counts across all provider calls in a multi-round turn** — `afterModelResponse` receives `{inputTokens: 30, outputTokens: 13, totalTokens: 43}` when two scripted rounds report `{10, 5, 15}` and `{20, 8, 28}` respectively; today it receives only the last round's value
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **counts rounds that reported usage even when some rounds report nothing** — `afterModelResponse` receives `{inputTokens: 30, outputTokens: 13, totalTokens: 43}` when three rounds run and only rounds 1 and 3 report usage; today only round 3's value is passed because round 3 overwrites round 1's value
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change `lastUsage = outcome.usage ?? lastUsage` in `chatOrchestrator.ts` to accumulate across rounds (sum each field, guard against undefined so a round reporting nothing is skipped rather than zeroed)
- [ ] Decide whether `afterModelResponse`'s third argument stays `UsageMetadata | undefined` (sum only) or widens to include per-round breakdown; record the rejected option in this ticket or the PR
- [ ] Update the "Measured semantics" bullet in `specs/hal-engine-config-hooks/spec.md` that documents the current under-counting behaviour — replace it with the new behaviour; the acceptance test statement was added above it
- [ ] Add a `### Changed` entry under `## [Unreleased]` in `CHANGELOG.md` describing the behaviour change for existing consumers of `afterModelResponse`

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate