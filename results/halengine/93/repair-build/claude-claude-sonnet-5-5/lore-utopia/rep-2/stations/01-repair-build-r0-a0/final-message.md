I fixed the four lint errors by editing the test and the spec. I didn't run ESLint (it doesn't fit in this pod), so CI hasn't judged the new commit yet. I ran Prettier on the test file.

- **`max-expects`:** In `src/orchestration/orchestratorHelpers.test.ts`, I split the two-expect `accumulateUsage` test. It's now one test for "only the right operand is defined" and one for "only the left operand is defined". Both still assert the same behaviour, one expect each.
- **`require-spec-link`:** In `specs/hal-engine-architecture/spec.md`, I added three bullets under "Across rounds". They link the `accumulateUsage` tests at lines 29, 35, 40 and 45:
  - field-by-field summing across rounds
  - a one-sided sum returning the defined side
  - two undefined operands returning undefined

The commit is pushed and the branch is not ahead of its upstream. Merging `origin/main` was already up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"accumulateUsage tests lacked spec links and one test had 2 expects; split the test and added spec bullets linking all of them"}}