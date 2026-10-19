Branch is pushed and up to date. This round closed all four facets:

- **Facet 1**: Added `accumulateUsage` helper to `orchestratorHelpers.ts` and updated `chatOrchestrator.ts` to use it — replaces `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = accumulateUsage(lastUsage, outcome.usage)`.
- **Facet 2**: Added one-line JSDoc to `afterModelResponse` in `OrchestratorHooks` and updated the generated CLAUDE.md block.
- **Facet 3**: Added `### Changed` entry to `[Unreleased]` in CHANGELOG.md.
- **Facet 4**: Spec already had the new statements; no re-anchor needed (test file wasn't moved).

Unit test written: `accumulateUsage` in `orchestratorHelpers.test.ts` — 4 cases (sum, both absent, absent next, absent accumulator). 0 regressions in `chatOrchestrator.test.ts` (24/24 still green).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across all tool rounds per turn (all four facets closed)","tdd_next":"acceptance green"}}