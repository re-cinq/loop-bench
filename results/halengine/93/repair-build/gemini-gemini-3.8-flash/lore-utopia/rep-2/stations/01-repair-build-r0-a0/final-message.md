CI reported four ESLint errors on `src/orchestration/orchestratorHelpers.test.ts`:
1. `sums token fields when both operands are defined` lacked a spec link (`re-lint/require-spec-link`)
2. `returns the defined side when one operand is undefined` lacked a spec link (`re-lint/require-spec-link`)
3. `returns the defined side when one operand is undefined` had 2 expect calls (`re-lint/max-expects`)
4. `returns undefined when both operands are undefined` lacked a spec link (`re-lint/require-spec-link`)

Resolved by consolidating the two `expect` calls in `src/orchestration/orchestratorHelpers.test.ts` into a single object comparison and adding normative statements under `### Across rounds` in `specs/hal-engine-architecture/spec.md` citing each of the three `accumulateUsage` unit tests. Ran spec checks (`check-spec-links`, `check-spec-anchor-names`, `check-spec-status`), formatted with Prettier, committed, and pushed to origin.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"linked accumulateUsage unit tests to architecture spec and consolidated multiple expect calls"}}