I fixed all four eslint errors CI reported in `src/orchestration/orchestratorHelpers.test.ts`, and the fix is pushed. I did not run eslint here, as the pod rules require, so the next CI run will show whether lint is green.

The branch hadn't moved since CI judged it at `19eaa4d`.

- **Two expects in one test (line 35):** that test checked both orders of passing `undefined`. I split it into two tests with one expect each, which keeps the same coverage: one for when nothing has been added up yet, one for when a round reports no usage.
- **Three tests with no spec link (lines 29, 35, 41):** I added four statements to `specs/hal-engine-architecture/spec.md`, one for each `accumulateUsage` test (lines 29, 35, 40 and 45 after the split). Each links to its test the same way the existing `shouldContinueToolLoop` statements just above them do.

Running only that test file with the repo's jest script, all 8 tests pass. The repo's prettier check covers only `.ts` files, and the test file was already formatted.

The commit is pushed, `origin/main` was already merged in, and `git status` shows the branch level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests lacked spec links and one test had two expects; split the test and added validated-by statements to the architecture spec"}}