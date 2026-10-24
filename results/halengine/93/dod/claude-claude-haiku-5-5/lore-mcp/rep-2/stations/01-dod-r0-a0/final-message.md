Acceptance tests for #93 are committed and pushed to `loop-bench/93` (`e32199b`). The branch is level with `origin/main` and has no upstream drift, so no merge was needed. Strategy is `direct`: the seam already exists, since `processMessage` drives the real orchestrator and the hook receives the usage argument.

The repo runs Jest, not Vitest as the brief assumed, so I ran the new file with the repo's own runner. Both tests fail for the reason the ticket states:

```
● turn usage across tool rounds › reports the sum of every provider call in a turn that ran two tool rounds
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 460,
    -   "outputTokens": 90,
    -   "totalTokens": 550,
    +   "inputTokens": 210,
    +   "outputTokens": 40,
    +   "totalTokens": 250,
      }

● turn usage across tool rounds › counts the rounds that reported usage when an earlier round reports none
    -   "inputTokens": 310,  -   "outputTokens": 60,  -   "totalTokens": 370,
    +   "inputTokens": 210,  +   "outputTokens": 40,  +   "totalTokens": 250,

Tests:       2 failed, 2 total
```

The command I ran was `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/turnUsage.acceptance.test.ts`, which is the repo's `npm test` runner pointed at one file. A bare `npx jest` fails on ESM loading, so the `--experimental-vm-modules` flag is needed.

What the tests pin:
- **Two tool rounds plus a final text round** sum to the total of every provider call, not just the last one.
- **A round that reports no usage** is skipped, and the rest are still summed.

Decisions I made for you to check:
- **Shape:** I chose the ticket's first option, a single summed `usage` argument. I rejected "pass both" in `.lore/dod.md` because it widens the public surface and nobody has asked for per-round granularity.
- **Scope:** the no-tools case is already pinned by the existing `receives collected response text and usage` test and `keeps the usage an earlier round reported...` test. I did not write a new test for it because it passes today.
- **Type criterion:** the "the type makes the answer unambiguous" criterion is not a runtime assertion. I left it as a facet for the implementation round, to be covered by CI's typecheck.
- **Spec link:** I did not add a `([validated by ...])` link to `specs/hal-engine-config-hooks/spec.md`. The statement there describes the current under-counting behaviour, so linking it to a passing test would be wrong until the implementation lands. The spec edit is listed as a facet.

Lore MCP tools were unavailable (connection closed), so I did not use them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}