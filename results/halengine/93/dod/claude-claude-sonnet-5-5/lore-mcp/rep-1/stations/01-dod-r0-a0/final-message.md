I committed and pushed two acceptance tests that fail today, plus `.lore/dod.md`. The strategy is `direct`: a scripted provider and an `afterModelResponse` hook through `processMessage` already show what the hook receives. The branch is level with its upstream and `origin/main` merged with nothing to add.

**Tests:** `src/orchestration/usageAcrossRounds.acceptance.test.ts`. I ran only this file, with `npm test -- src/orchestration/usageAcrossRounds.acceptance.test.ts`.

Both tests fail because the hook gets only the last round's usage, which is the ticket's claim:
- **Sum across two tool rounds:** the rounds report 100, 200 and 300 input tokens. Expected `inputTokens: 600, outputTokens: 70, totalTokens: 670`, received `300 / 40 / 340`, so only the final call was counted.
- **A round reports no usage:** expected `400 / 50 / 450`, received `300 / 40 / 340`.

**Choices I made:**
- The ticket leaves the signature open. I picked the sum as the existing third `usage` argument, which keeps the existing `usage` argument and its type. A per-round breakdown can come later as an extra argument.
- I did not write a "nothing reported means `undefined`" test. It passes today, and the brief says every acceptance test must fail. The existing "keeps the usage an earlier round reported" test still covers that path.
- The existing no-tools test must stay unedited and green.
- I did not touch `specs/hal-engine-config-hooks/spec.md`. The "type makes it unambiguous", spec and CHANGELOG criteria are listed as facets in the DoD for the implementing round.
- I ran prettier on the new test file only, per the brief. I did not run the linter or the typechecker.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}