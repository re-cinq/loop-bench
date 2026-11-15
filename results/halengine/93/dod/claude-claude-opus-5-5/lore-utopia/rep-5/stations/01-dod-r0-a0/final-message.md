I've committed and pushed two acceptance tests for #93, and both fail today for the reason the ticket gives. The branch is merged with `origin/main` (nothing new came in) and `git status` shows it level with its upstream.

**Strategy: `direct`.** The seam already exists: the tests call `createChatOrchestrator(...).processMessage` with a real `afterModelResponse` hook, a scripted provider and a real `ToolRegistry`. Nothing is mocked.

**`.lore/dod.md`** opens with the ticket's claim, quoted: *"For a turn that called tools, it is the last leg of several, and the earlier rounds … are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns…"*

**Tests**, in `src/orchestration/turnUsage.acceptance.test.ts`:
1. **reports the sum of every provider call in a turn that ran two tool rounds**: three provider calls reporting 110, 220 and 440 total tokens should add up to 770.
2. **counts the rounds that reported usage and reports nothing when no round did**: if one round reports nothing, the hook still gets the sum of the others (not `undefined` or `NaN`). If no round reports, it gets `undefined`.

The red bar, from `npx jest src/orchestration/turnUsage.acceptance.test.ts`:
```
● … › reports the sum of every provider call in a turn that ran two tool rounds
    -   "inputTokens": 700,   -   "outputTokens": 70,   -   "totalTokens": 770,
    +   "inputTokens": 400,   +   "outputTokens": 40,   +   "totalTokens": 440,
● … › counts the rounds that reported usage and reports nothing when no round did
        "none": undefined,
    -     "inputTokens": 500,  -     "outputTokens": 50,  -     "totalTokens": 550,
    +     "inputTokens": 400,  +     "outputTokens": 40,  +     "totalTokens": 440,
Tests:       2 failed, 2 total
```
In both cases the hook receives only the last round's usage, which is the bug the ticket reports. The "nothing reported" half of test 2 already holds today; the summing half is what makes it fail.

**Other changes in the commit:**
- **Spec:** in `specs/hal-engine-config-hooks/spec.md` I replaced the line that recorded the under-counting with two statements, each citing its test. `scripts/check-spec-anchor-names.mjs` reports all 9 citations in that spec name the test they point at. I didn't touch `Status`.
- **Signature:** the ticket's "no-tool turn unchanged" criterion relies on the existing test `afterModelResponse › receives collected response text and usage` staying unedited. That test compares the hook's third argument to a plain `UsageMetadata`, so the third argument has to stay the summed total. If the implementer also wants a per-round breakdown, it has to go in a new fourth argument. I wrote this into the DoD.
- **Left to the implementer:** the type criterion ("the hook's type makes it unambiguous that it's a sum") can't be checked by a runtime test, so it's a facet for review and CI's typecheck. The CHANGELOG line and MINOR version bump are facets too.

**Also worth knowing:**
- Prettier warns that `.lore/dod.md` isn't formatted. I left it as is because the required DoD layout needs those blank lines and indents. As far as I know, `prettier:check` only covers `src/**/*.ts`.
- Spec stamping: the test file names its spec section in a header comment, but `scripts/lore-list-tests.mjs` doesn't output a `spec` field at all. So the automatic link the brief describes can't form from the test list today; the spec's own citations carry the traceability.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}