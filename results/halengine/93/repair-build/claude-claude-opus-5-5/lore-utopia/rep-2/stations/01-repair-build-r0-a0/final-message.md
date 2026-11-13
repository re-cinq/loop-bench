I fixed all four eslint errors CI reported. The commit is pushed and `git status` shows the branch level with `origin/loop-bench/93`. The branch already contained everything on `origin/main`, so there was nothing to merge.

- **`re-lint/max-expects`** (`orchestratorHelpers.test.ts:35`): that test had two `expect` calls, so I split it into two tests, one per side of `accumulateUsage`. Each still asserts the same thing as before.
- **`re-lint/require-spec-link`** (the old lines 29, 35 and 41): the `accumulateUsage` tests weren't linked to any spec. I added a "Summing usage across rounds" section to `specs/hal-engine-architecture/spec.md`, next to the existing helper section. It has one `[validated by]` link per test, pointing at lines 29, 35, 40 and 45.

I ran `npm test -- src/orchestration/orchestratorHelpers.test.ts` (jest) and all 8 tests passed. I didn't run eslint here, as instructed, so CI's next run will confirm the lint fix. Prettier left the test file unchanged. On the spec it also reformatted many unrelated lines, so I reverted that and kept only the new section.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one test had 2 expects; split the test and linked all four from hal-engine-architecture spec"}}