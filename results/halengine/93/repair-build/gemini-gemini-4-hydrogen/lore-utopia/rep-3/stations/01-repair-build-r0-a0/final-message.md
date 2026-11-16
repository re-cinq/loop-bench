Fixed all 4 ESLint errors on `src/orchestration/orchestratorHelpers.test.ts`:

- Consolidated the two `expect` calls in `returns the defined side when one operand is undefined` (`src/orchestration/orchestratorHelpers.test.ts#L35`) into a single `expect({...}).toEqual({...})` assertion (`re-lint/max-expects`).
- Added a `### Accumulating usage across rounds` section in `specs/hal-engine-architecture/spec.md` with trailing `([validated by: ...](../../src/orchestration/orchestratorHelpers.test.ts#Lnn))` citations for lines 29, 35, and 46 (`re-lint/require-spec-link`).
- Verified `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`, `npm run prettier:check`, and `npm test -- src/orchestration/orchestratorHelpers.test.ts` (7/7 passed), then committed (`3bdcbf5`) and pushed to `origin/loop-bench/93` (`origin/main` already up to date).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"orchestratorHelpers.test.ts failed re-lint/max-expects on L35 and re-lint/require-spec-link on L29, L35, L41"}}