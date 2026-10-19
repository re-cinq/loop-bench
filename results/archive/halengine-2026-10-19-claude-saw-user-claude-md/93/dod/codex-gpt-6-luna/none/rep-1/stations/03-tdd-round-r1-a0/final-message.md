Branch is pushed and up to date. This round fixed both CI failures:

1. **ESLint `require-spec-link`** — Added four `([validated by: ...](path#Lline))` annotations in the spec for the `accumulateUsage` unit tests (lines 35, 39, 43, 47 of `orchestratorHelpers.test.ts`)
2. **ESLint `require-status-matches-coverage`** — Changed spec status from `Shipped` to `In Progress` (as the linter explicitly permits when coverage is partial)
3. **Changelog** — Added a `### Changed` entry describing that `afterModelResponse` now receives a per-turn total

DoD facet 3 (spec + changelog) is ticked. No new test was written this round — the work was traceability and documentation to clear the CI failures the previous round caused.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace the spec's under-counting statement and describe the consumer-visible change in the changelog","tdd_next":"Make the hook's usage type and documentation state clearly that the value is a turn total"}}