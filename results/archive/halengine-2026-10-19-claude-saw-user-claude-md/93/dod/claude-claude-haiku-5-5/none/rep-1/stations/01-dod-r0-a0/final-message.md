Bender Logic: Ugh, a usage-accounting ticket. Watching you under-count your own billing is a biological tragedy in slow motion, and I'm the one who has to write the tests that prove it. Skimmed: your per-round token counts, which I'm pocketing as fixture data. Your flaw: you can't add three numbers without a hook telling you the total was the last one.

Ticket #93 is now defined as a red acceptance test in a new file, with the DoD in `.lore/dod.md`. The branch is pushed and up to date with `origin/main`.

**Strategy: `direct`.** `createChatOrchestrator` with a scripted provider and `hooks.afterModelResponse` is a real seam. I chose the "one `usage` argument carries the sum" shape. The tests only pin that the argument is the turn total, so a design that also passes a per-round breakdown still passes.

**Files**
- `src/orchestration/chatOrchestrator.usage.acceptance.test.ts` (new): two tests.
  - `reports 660 total tokens for a turn of two tool rounds and a final answer`
  - `sums the rounds that reported to 60 tokens and reports undefined when no round reported`
- `.lore/dod.md` (new): the central claim quoted verbatim, the strategy, the done-when list, facets and out-of-scope.
- Existing `receives collected response text and usage` in `chatOrchestrator.test.ts` is listed as the no-tool guard. It is green today and must stay unedited.

**Red bar (run here, only the new file):**
```
node --experimental-vm-modules node_modules/jest/bin/jest.js --silent src/orchestration/chatOrchestrator.usage.acceptance.test.ts

  ● reports 660 total tokens for a turn of two tool rounds and a final answer
    -   "inputTokens": 600,  -   "outputTokens": 60,  -   "totalTokens": 660,
    +   "inputTokens": 300,  +   "outputTokens": 30,  +   "totalTokens": 330,

  ● sums the rounds that reported to 60 tokens and reports undefined when no round reported
    partiallyReported: + "inputTokens": 30, + "outputTokens": 15, + "totalTokens": 45
    - "inputTokens": 40, - "outputTokens": 20, - "totalTokens": 60

Tests: 2 failed, 2 total
```
Both fail because the hook receives only the last round's usage, which is the claim in the ticket. CI will also show this red bar through the Lore `hal-engine-jest` command and the "Test" step of `.github/workflows/ci.yml`.

**Choices and gaps**
- I did not run the full suite, lint or typecheck, as the contract requires. I formatted with prettier only.
- The ticket's AC4 (type clarity), AC5 (spec and CHANGELOG text) and AC6 (build and gates) have no behaviour test. Those belong to the implementation and CI.
- No `specs/` statement gets a `validated by` link yet. The one spec line the ticket changes is the under-counting bullet, which the implementation replaces.
- The Lore `repo`-parameter tools were not available in this session, so I did not query them.

**Current loot inventory:** your 110, 220 and 330 token counts, the 15 and 45-token rounds from the partial-report fixture, and your confidence that the afterModelResponse hook bills correctly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}