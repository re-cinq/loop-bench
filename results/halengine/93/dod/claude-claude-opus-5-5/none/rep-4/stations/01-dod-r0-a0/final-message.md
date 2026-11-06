The DoD for #93 is done: two new acceptance tests both fail for the reason the ticket gives. The commit is pushed, the branch already includes `origin/main`, and it is not ahead of its upstream.

**Strategy: `direct`.** `createChatOrchestrator`, driven by a scripted provider and a real `ToolRegistry`, already runs a turn through several tool rounds. The `afterModelResponse` hook is where the reported usage can be observed.

**Shape I chose:** add up every round into the existing single `usage` argument. I rejected "a total plus a per-round breakdown" because it widens the API and nothing needs the per-call detail yet. The reasons are written into the spec.

**What I committed:**
- `src/orchestration/turnUsage.acceptance.test.ts`, with two tests:
  - **reports the sum of every provider call in a turn driven through two tool rounds**: three provider calls report 110, 220 and 330 tokens, and the hook should get 600 input / 60 output / 660 total.
  - **counts only the rounds that reported usage, and reports nothing when no round did**: a round with no usage is skipped without making the total `undefined` or `NaN`, and a turn where no round reported usage still passes `undefined`.
- `.lore/dod.md` in the required shape. Prettier wanted to re-indent the test-path lines there, so I left that file unformatted to keep the mandated layout; the repo's prettier check only covers `.ts` files, so CI should be unaffected.
- `specs/hal-engine-config-hooks/spec.md`: I removed the bullet that recorded the under-counting and added a "Usage across tool rounds" section. Its three statements link to the two new tests and to the existing no-tools test. The spec now describes the summed behaviour, which the code does not have yet.

**Red bar** (`npx jest src/orchestration/turnUsage.acceptance.test.ts`):
```
● … › reports the sum of every provider call in a turn driven through two tool rounds
    -   "inputTokens": 600,   -   "outputTokens": 60,   -   "totalTokens": 660,
    +   "inputTokens": 300,   +   "outputTokens": 30,   +   "totalTokens": 330,
● … › counts only the rounds that reported usage, and reports nothing when no round did
        "none": undefined,
    -     "inputTokens": 400, "outputTokens": 40, "totalTokens": 440,
    +     "inputTokens": 300, "outputTokens": 30, "totalTokens": 330,
Tests:       2 failed, 2 total
```
In both cases the hook received only the last provider call's usage, which is exactly what the ticket reports.

The existing test that pins the no-tools turn, `chatOrchestrator.test.ts` › "receives collected response text and usage", passes today (`Tests: 1 passed`). It must stay unedited.

**Left for the implementing round** (listed under Facets in `dod.md`):
- Replace `lastUsage` with a running sum.
- Rename the hook's parameter and add a doc comment so the signature says it is a sum. This is the "the type makes the answer unambiguous" criterion; it can't be checked at runtime, so the review judges it.
- Regenerate the hooks block in CLAUDE.md if the declaration changes.
- Add a CHANGELOG line for the MINOR bump saying turns that ran tools will now record a larger number.

The repo has no `scripts/spec-links/reanchor.mjs`, so I checked the `#L56`, `#L66` and `#L236` spec links by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}