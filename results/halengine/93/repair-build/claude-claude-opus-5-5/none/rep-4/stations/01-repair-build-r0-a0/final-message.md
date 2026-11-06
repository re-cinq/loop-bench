I fixed all four eslint errors from CI's run on `19eaa4d` and pushed the fix to `loop-bench/93`. The branch hadn't moved since CI checked it, already contains `origin/main`, and isn't ahead of its upstream.

- **`re-lint/max-expects` (line 35):** the test "returns the defined side when one operand is undefined" had two `expect` calls. I split it into two tests, one per side, with the same assertions:
  - "returns the next round when nothing has been accumulated yet" (line 35)
  - "keeps the accumulated total when the next round reports nothing" (line 40)
- **`re-lint/require-spec-link` (×3):** none of the `accumulateUsage` tests was cited by a spec. In `specs/hal-engine-architecture/spec.md`, under "Across rounds", I added four statements describing how usage adds up across rounds. Each one links to one of the four tests (lines 29, 35, 40, 45).

What I ran here:
- `npm test -- src/orchestration/orchestratorHelpers.test.ts`: 8 tests passed.
- `npm run check:spec-links`: the first version put two links in one statement, which this check rejects, so I split it into two statements. It now reports 0 misplaced links.
- Prettier on the changed test file.

I didn't run eslint, as instructed, so CI's next run is what confirms the lint errors are gone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one test had two expects; split the test and cited all four in the architecture spec"}}