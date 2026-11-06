I fixed the four eslint errors CI named in `src/orchestration/orchestratorHelpers.test.ts`, and pushed the change. I didn't run eslint here (it doesn't fit this pod), so CI on the new head is the check.

- **`max-expects` (line 35):** the test "returns the defined side when one operand is undefined" had two `expect` calls. I folded them into one `expect([...]).toEqual([usage, usage])`.
- **`require-spec-link` (lines 29, 35, 41):** I added a bullet to `specs/hal-engine-config-hooks/spec.md` that cites all three `accumulateUsage` tests with `validated by` links.

The branch merges cleanly with `origin/main`, and `git status` shows it is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: folded two expects into one and added spec validated-by links for the three accumulateUsage tests"}}