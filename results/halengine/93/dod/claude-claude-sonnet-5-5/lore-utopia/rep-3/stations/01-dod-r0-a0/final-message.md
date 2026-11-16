I wrote two acceptance tests for #93. Both fail today for the ticket's stated reason, and the branch is pushed and up to date with `origin/main`.

**Strategy: `direct`.** `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook already gives a real seam.

The tests are in `src/orchestration/usageAcrossRounds.acceptance.test.ts`. I ran them with `NODE_OPTIONS=--experimental-vm-modules npx jest --silent <that file>`:

- **Two tool rounds:** rounds report 10/2, 20/5 and 30/7 tokens. The hook should get 60/14/74 but gets only the last round.
  ```
  - "inputTokens": 60,  + "inputTokens": 30,
  - "outputTokens": 14, + "outputTokens": 7,
  - "totalTokens": 74,  + "totalTokens": 37,
  ```
- **A round with no usage:** rounds 1 and 3 report and round 2 doesn't. The expected total is 40/9/49, but the hook gets 30/7/37, the last round alone.

I chose the ticket's first shape: the hook keeps its single `usage` argument and it becomes the turn's sum, with no per-round breakdown. That is my pick; the ticket left the choice open.

- **Dropped test:** I dropped a third test, "nothing reported means `undefined`". It passes today, so it wasn't red, and the existing tests still cover that case.
- **Not tested:** the type-clarity, spec-line and CHANGELOG criteria. They aren't observable at runtime, so they are facets in `.lore/dod.md` for review to judge.
- **No-tool turn:** the existing unedited test pins this and stays green.
- **Spec link:** I left the spec's under-counting line in `specs/hal-engine-config-hooks/spec.md` alone, so no `validated by` link was added. The implementing round rewrites that line and links it.

`.lore/dod.md` is committed with the tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}