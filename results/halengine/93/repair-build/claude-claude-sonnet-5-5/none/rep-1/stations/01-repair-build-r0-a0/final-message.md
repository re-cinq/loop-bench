I fixed the four eslint errors and pushed the branch, but I haven't confirmed the build is green. As instructed, I didn't run eslint, so CI will re-judge the new head. The branch is up to date with `origin/main` and not ahead of its upstream.

- **`max-expects`:** I split the "returns the defined side when one operand is undefined" test in `src/orchestration/orchestratorHelpers.test.ts` into two single-assertion tests, one per operand.
- **`require-spec-link`:** I added an "Accumulating usage" section to `specs/hal-engine-architecture/spec.md`. It has four statements, each linked with `validated by` to one `accumulateUsage` test at its current line.
- **Prettier:** On its first pass it reformatted unrelated blank lines in the spec, so I reverted that. The spec diff is only the seven added lines.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: split multi-expect accumulateUsage test and added spec links for its tests in hal-engine-architecture spec"}}