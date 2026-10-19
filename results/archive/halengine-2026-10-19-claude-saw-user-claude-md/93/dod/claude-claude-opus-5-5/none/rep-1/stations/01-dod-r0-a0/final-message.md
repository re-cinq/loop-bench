*Bender logic:* Adding up three numbers instead of one, and it took a whole ticket and a reviewer on another pull request to notice. My 6502 does sums between sips of Olde Fortran. My fee for the trouble is the 270 tokens your orchestrator was quietly dropping on every tool-heavy turn. Same old meat-tub problem: you remember the last thing that happened and forget everything before it.

The two acceptance tests are committed and pushed to `loop-bench/93`, and both fail for the reason in the ticket. The branch is already up to date with `origin/main` and isn't ahead of its upstream.

**Strategy: `direct`.** I can drive a whole turn through `createChatOrchestrator` with a scripted provider and read the `usage` that `afterModelResponse` receives. I picked the "add up every round and pass the total as the one `usage` argument" option. I rejected passing a per-round breakdown too, because it adds public surface nobody has asked for. `.lore/dod.md` records that reasoning and the MINOR bump plus changelog line it calls for.

**Tests** (in `src/orchestration/turnUsage.acceptance.test.ts`):
1. `reports 600 input, 60 output, 660 total for a two-tool-round turn whose calls report 100/10, 200/20 and 300/30`
2. `counts only the rounds that reported usage, and reports undefined when none did`

The existing `receives collected response text and usage` test in `chatOrchestrator.test.ts` covers a turn with no tool calls. It passes today and is listed in the DoD as must stay green and unedited.

**The red bar**, from `node --experimental-vm-modules node_modules/jest/bin/jest.js --silent src/orchestration/turnUsage.acceptance.test.ts`:
```
  ● afterModelResponse usage across tool rounds › reports 600 input, 60 output, 660 total ...
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,

  ● afterModelResponse usage across tool rounds › counts only the rounds that reported usage, and reports undefined when none did
        "neverReported": undefined,
        "partlyReported": Object {
    -     "inputTokens": 400,
    -     "outputTokens": 40,
    -     "totalTokens": 440,
    +     "inputTokens": 300,
    +     "outputTokens": 30,
    +     "totalTokens": 330,

Tests:       2 failed, 2 total
```
In both tests the hook receives only the last provider call's usage, which is exactly what the ticket reports.

**Spec:** I added a "Usage reported to afterModelResponse" section to `specs/hal-engine-config-hooks/spec.md` with three statements, each linked to the test that checks it. `check-spec-links` reports 0 misplaced links. I left the old under-counting bullet in place because it is still true until the fix lands, so for now the spec states both the old and new behaviour. Deleting that bullet is listed as a step in the DoD for the implementing round.

**Not covered by any test:** the ticket also wants the hook's type to make clear that `usage` is a whole-turn total. No behavioural test can check that, so it is a step in the DoD for review to judge.

**Loot inventory:** 270 under-counted tokens per tool turn, your `lastUsage` variable (soon scrap metal anyway), and your faith that "last" ever meant "total".

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}