Branch is up to date with upstream and `origin/main` — nothing left unpushed.

## What CI flagged and what I did

The verdict named one file, `src/orchestration/orchestratorHelpers.test.ts`, with four eslint errors: three `accumulateUsage` tests (lines 29, 35, 41) failing `re-lint/require-spec-link`, and line 35 failing `re-lint/max-excepts` (2 expects, max 1). The branch had not moved past the judged sha `19eaa4d`, so these findings were current.

**Fixes, in order:**

1. **`re-lint/max-excepts` at 35** — split `returns the defined side when one operand is undefined` (two `expect` calls) into two tests, one per operand order: `returns the next usage when the accumulated side is undefined` (now L35) and `returns the accumulated usage when the next side is undefined` (now L40). Splitting rather than merging keeps the two recovery directions independently asserted.
2. **`require-spec-link` ×3** — added four statements to `specs/hal-engine-config-hooks/spec.md` (the spec this branch already extended with the summed-usage behaviour) citing all four helper tests with trailing `[validated by: <name>](...)` citations whose `#Lnn` anchors land on the `it(` declarations at lines 29, 35, 40, 45.

**Verified** with the repo's lightweight node scripts (no eslint in this pod — it OOMs here): `spec:names` confirms 594 citations name the tests they point at, `check:spec-links` reports 0 misplaced across 1643 statements, `check:spec-status` reports 0 findings. Ran the single edited test file: 8 passed. `prettier --write` on the changed file left it unchanged. The rule requirements are satisfied mechanically — every test is now referenced by a spec link into its own span, and every test carries exactly one `expect`. No `eslint-disable`, no skipped or loosened test.

Committed as `24bb647`, pushed, `git status` reports up to date with `origin/loop-bench/93`, and `origin/main` was already an ancestor.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint red on orchestratorHelpers.test.ts — split the two-expect accumulateUsage test and cited all four helper tests from specs/hal-engine-config-hooks/spec.md so require-spec-link and max-excepts pass"}}