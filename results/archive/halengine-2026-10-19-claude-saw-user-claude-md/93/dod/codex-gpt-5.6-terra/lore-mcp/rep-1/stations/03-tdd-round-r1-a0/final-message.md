Pushed successfully. All 3 CI failures addressed:

- **eslint**: Fixed 5 stale spec-link errors in `orchestratorHelpers.test.ts` (ran `spec:names --fix` to repoint L11/L15/L19/L23 → L33/L37/L41/L45), added accumulateUsage spec statements for L11/L17/L22/L27, updated acceptance test links to new positions (L65/L81), extracted `FIRST_TOOL_ROUND` constant to eliminate the duplicate-code error
- **spec-names**: Resolved by the `spec:names --fix` run
- **changelog**: Added the `afterModelResponse` summed-usage behaviour change under `### Changed`

No regressions written; 0 new tests written (this was a CI-fix round, not a red-green round). Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document the summed hook contract and its compatibility change in the config-hooks spec and CHANGELOG","tdd_next":"acceptance green"}}