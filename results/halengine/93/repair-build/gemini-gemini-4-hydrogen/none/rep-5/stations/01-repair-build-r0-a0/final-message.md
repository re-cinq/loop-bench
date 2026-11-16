Fixed the four ESLint errors in `src/orchestration/orchestratorHelpers.test.ts`:
- Combined the two `expect` calls in `returns the defined side when one operand is undefined` (`src/orchestration/orchestratorHelpers.test.ts#L35`) into a single `expect([..., ...]).toEqual([usage, usage])` assertion (`re-lint/max-expects`).
- Added trailing `([validated by: ...])` spec citations in `specs/hal-engine-config-hooks/spec.md` for all three `accumulateUsage` tests (`#L29`, `#L35`, `#L40`) (`re-lint/require-spec-link`).

Verified locally with `jest src/orchestration/orchestratorHelpers.test.ts` (7/7 passed), `prettier --check`, `repoint-spec-anchors.mjs --check origin/main`, `spec:names`, `check:spec-links`, `check:spec-status`, and `check-changelog.sh origin/main` (ESLint, `tsc`, and `npm run build` were not run locally per pod limits and will be judged by CI on `5eff904`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"added spec citations and merged duplicate expect in orchestratorHelpers.test.ts"}}