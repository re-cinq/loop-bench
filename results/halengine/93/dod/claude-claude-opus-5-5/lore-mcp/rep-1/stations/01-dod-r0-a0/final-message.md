I wrote two acceptance tests for #93. Both fail because `afterModelResponse` receives only the last provider call's usage. They are committed and pushed to `loop-bench/93`; the branch already had everything from `origin/main` and is not ahead of its upstream.

**Strategy: `direct`.** The seam already exists: `createChatOrchestrator` with a scripted provider and a real `ToolRegistry` can drive a turn through two tool rounds. No mocks were needed.

**Shape I chose for the ticket's "decide" question:** add up usage across all rounds and pass the total through the existing single `usage` argument. I rejected passing a per-round breakdown as well, because it widens the public API and nothing asks for that. Anyone who wants per-call numbers can still read each `stop` chunk's `usage` from the stream. Because tool-heavy turns will now report larger numbers, this needs a MINOR version bump and a CHANGELOG line. The reasoning is in `.lore/dod.md`.

**Tests** — `src/orchestration/turnUsage.acceptance.test.ts`, run with `npm test -- src/orchestration/turnUsage.acceptance.test.ts`:
1. **`reports the sum of every provider call in a turn that ran two tool rounds`** — three provider calls report 110, 220 and 330 total tokens; the hook should get 600/60/660.
2. **`counts only the rounds that reported usage, and reports none when no round did`** — a middle round with no usage gives 400/40/440 (no `NaN`), and a turn where no round reported gives `undefined`. The "nothing reported" half already passes today, so I put both halves in one assertion that fails on the partial case.

Failure output:
```
● afterModelResponse usage across tool rounds (specs/hal-engine-config-hooks/spec.md#8) › reports the sum of every provider call in a turn that ran two tool rounds
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,
● afterModelResponse usage when some rounds report none (specs/hal-engine-config-hooks/spec.md#9) › counts only the rounds that reported usage, and reports none when no round did
        "none": undefined,
        "partial": Object {
    -     "inputTokens": 400, ... "totalTokens": 440,
    +     "inputTokens": 300, ... "totalTokens": 330,
Tests:       2 failed, 2 total
```
Both are the under-counting the ticket describes: the hook gets the last call's 300/30/330 instead of the total.

**Spec:** `specs/hal-engine-config-hooks/spec.md` now has a "Usage reported to `afterModelResponse`" section with two statements, each linked to its test. Its old under-counting line is removed. The test names are stamped with `#8` and `#9`, which assumes the spec's statements are numbered from 1 in document order.

**Covered by existing tests, not new ones:**
- **Turns with no tools:** the ticket says this case is covered by the existing tests in `chatOrchestrator.test.ts` staying unedited, so I wrote nothing new for it.
- **The type saying it is a sum:** Jest can't check a type, so this is listed under Facets for the next round, along with the CHANGELOG entry.

**Something I noticed outside this ticket:** `onError` still never runs when a non-`Error` value is thrown. It stays recorded in the spec's "Measured semantics" section.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}