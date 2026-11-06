I fixed all four eslint errors CI reported on `19eaa4d` and pushed the fix to `loop-bench/93`. I didn't run eslint in this pod, so the next CI run is what confirms lint is green.

The problems were all in `src/orchestration/orchestratorHelpers.test.ts`:
- **`re-lint/max-expects` at line 35:** the test "returns the defined side when one operand is undefined" had two `expect` calls. I split it into two tests, each with one assertion: "returns the next usage when nothing has accumulated yet" and "keeps the accumulated usage when the next round reports none". The coverage is the same as before.
- **`re-lint/require-spec-link` at lines 29, 35 and 41:** none of the new `accumulateUsage` tests was linked from a spec. I added four statements, one per test, under "Across rounds" in `specs/hal-engine-architecture/spec.md`, each citing its test's line (29, 35, 40, 45).

What I ran here:
- The jest suite for that test file: 8 of 8 pass.
- `npm run check:spec-links`: 0 problems.
- `npm run check:spec-status`: 0 findings.

Prettier had reformatted unrelated code-block spacing in the spec markdown, so I reverted that and kept only my four added lines. The commit is pushed, `origin/main` was already merged in, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one test had two expects"}}