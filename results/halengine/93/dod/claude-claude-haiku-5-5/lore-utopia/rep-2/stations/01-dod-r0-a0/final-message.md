The red acceptance test is committed and pushed to `loop-bench/93` (commit `30acab4`). The branch is up to date with `origin/main`, and `git status` reports it is not ahead of its upstream.

**Triage: `direct`.** `processMessage` is already the real entry point, and `afterModelResponse` already receives the turn's usage through it. Only the value is wrong: it carries the last round's usage, not the turn's.

**Decision: sum, not pass-both.** The test asserts one `usage` argument holding the sum of every provider call. I chose it because the ticket names no need for per-round data, and pass-both widens the public API for nothing it states. If the implementer picks pass-both, the test must be rewritten in the same change. This is recorded in `.lore/dod.md`.

**Acceptance test:** `src/orchestration/usageAcrossRounds.acceptance.test.ts`. A scripted provider runs three provider calls: a tool round reporting 10/5/15, a tool round reporting nothing, and a final round reporting 20/7/27. The hook should receive 30/12/42.

I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/usageAcrossRounds.acceptance.test.ts`. The failure is the ticket's claim, not a fixture problem:

```
● afterModelResponse usage across tool rounds › reports the sum of every provider call in a turn that ran two tool rounds, skipping a round that reported none

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 12,
    -   "totalTokens": 42,
    +   "inputTokens": 20,
    +   "outputTokens": 7,
    +   "totalTokens": 27,
      }
```

Received is only the final round's usage, which is the under-count the ticket describes.

**Guards that must stay green:** the existing tests "receives collected response text and usage" and "keeps the usage an earlier round reported when a later round reports none" in `src/orchestration/chatOrchestrator.test.ts`. I ran that file: 24 of 24 pass today.

**Open items for you:**
- **Spec traceability is not done.** The test is uncited, and `require-spec-link` in `eslint.config.mjs` will flag it as a CI lint failure. The only statement it could cite is the under-counting line in `specs/hal-engine-config-hooks/spec.md`, which the ticket replaces. Citing it now would tie a passing claim to a test that contradicts it. The `.lore/dod.md` facets assign the citation to the replacement statement.
- **Not covered by a red test:** the "nothing reported still reports nothing" criterion. It passes today, so it can only be a guard, and it appears as a facet.
- **Typecheck and "no `any`"** are not tested here. They are CI's, as the ticket's criteria say.
- The lore MCP server failed to connect, so I did not query lore context.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}