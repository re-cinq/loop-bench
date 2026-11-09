Done. The ticket is defined by three acceptance tests in a new file, two of them red today for exactly the reason the reporter stated.

**Strategy: `direct`** — the seam already exists (`createChatOrchestrator` + a scripted provider + an `afterModelResponse` hook, the same path `chatOrchestrator.test.ts` drives), so the under-count is observable directly. The DoD pins shape one (accumulate across rounds into the one `usage` argument) and records in `.lore/dod.md` why the pass-both shape was rejected, as the ticket asks.

**Test files run** (only these): `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`, plus the three named existing tests that must stay green unedited (`receives collected response text and usage`, `keeps the usage an earlier round reported when a later round reports none` in `chatOrchestrator.test.ts`; `hands afterModelResponse text ending in the sentence, and the usage of a run without the hook` in `toolBudget.test.ts` — all pass today).

Actual failure output, matching the ticket's claim verbatim ("what the hook receives is the usage of the final provider call alone"):

```
● afterModelResponse usage across tool rounds › reports the usage of every provider call in a two-round tool turn, not only the last round
    expect(received).toEqual(expected) // deep equality
    - Expected  - 3
    + Received  + 3
      Array [
        Object {
    -     "inputTokens": 140,
    -     "outputTokens": 60,
    -     "totalTokens": 200,
    +     "inputTokens": 40,
    +     "outputTokens": 50,
    +     "totalTokens": 90,
```

and the middle-round case: expected `{15, 6, 21}` (rounds 1+3), received `{5, 4, 9}` (round 3 alone). The third test — nothing reported → still reports nothing — is green today by design; it guards the accumulator against collapsing `undefined` into zeros/NaN.

**Findings worth noting:**
- The ticket's fourth criterion (the type says "sum") is compile-time only, and I verified with a probe file that **jest here cannot red-bar a missing export**: ts-jest runs under tsconfig `isolatedModules: true`, so a file importing a non-existent `TurnUsage` passes the suite. I wrote that test, found it dishonestly green, deleted it, and carried the criterion as a DoD facet whose red bar is CI's `Type check` step (`tsc --noEmit`) in the `Verify` job.
- AC2's "pinned by the existing test remaining unedited" holds under the sum: with only one round reporting, summing equals the existing expectation, so all three green pins survive the fix unedited.
- `specs/hal-engine-architecture/spec.md:199` also shows the hook signature and needs the same update as the config-hooks spec bullet — recorded as a facet.

Committed as `eb190ee` on `loop-bench/93`, pushed, and confirmed up to date with `origin/main` (`git status`: branch up to date, tree clean).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}