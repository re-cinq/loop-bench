I fixed all four eslint errors CI reported in `src/orchestration/orchestratorHelpers.test.ts`, and the fix is pushed. I didn't run eslint here, as instructed, so the next CI run will confirm it.

- **Missing spec links (three errors):** the three `accumulateUsage` tests at lines 29, 35 and 41 weren't cited from any spec. I added statements under "Across rounds" in `specs/hal-engine-architecture/spec.md` that cite each test, next to the existing round-loop citations.
- **Too many `expect` calls (one error):** the test at line 35 had two. I split it into two tests: "returns the later usage when nothing was accumulated yet" and "keeps the accumulated usage when the later round reported none". The citations point to the new line numbers (29, 35, 40, 45).

What I ran locally:
- **Tests:** jest on `orchestratorHelpers.test.ts` passed, 8 of 8.
- **`npm run check:spec-links`:** my first wording failed it, because one statement had a citation in the middle of the sentence instead of all citations in one bracket at the end. I fixed that in a second commit and it now reports 0 misplaced.

Prettier on the spec file also added blank lines in unrelated parts of it. I reverted that, since this repo's `prettier:check` only covers `.ts` files. Merging `origin/main` brought in nothing new, and `git status` shows the branch level with its remote.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one test had 2 expects; split it and cited all four from the architecture spec"}}