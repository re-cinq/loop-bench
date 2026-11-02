The acceptance tests for #37 are committed and pushed to `loop-bench/37`. The branch is in sync with its upstream, is not behind `origin/main`, and merges cleanly.

**Strategy: `direct`.** `ToolRegistry.execute` is a real entry point, so the tests call it directly and fail on the missing validation.

I kept the two tests a prior round had already written. They cover the ticket's central claim, which is that the executor runs without any schema check. I added the spec links and reran them. The only change this round is the DoD quote, which now carries the ticket sentence's full parenthetical.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`):

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ... › rejects input missing a required property without invoking the executor
    expect(received).toContain(expected) // indexOf
    Expected substring: "location"
    Received string:    "Sunny, 21C"
  ● ... › rejects a wrong-typed property naming its path and expected type, never echoing the value
    Expected substring: "location"
    Received string:    "Sunny, 21C"
Tests:       2 failed, 2 total
```

Both fail for the stated reason. The executor runs and returns its forecast, and nothing checks `inputSchema` first.

**What the DoD leaves open.** The ticket's acceptance list is much longer than two tests. The remaining items are recorded as facets in `.lore/dod.md`: compile at `register`, per-call compilation for function-valued sources, redaction in logs, the tool-loop test, the `Unknown tool` pin, the docs and changelog, and the `package.json` dependency. Only two spec statements exist so far, so the "done" set is not yet the whole ticket.

**Decisions I made.**
- I kept the two tests rather than rewriting them, since they already fail for the right reason.
- The DoD quote is the ticket's first "Why" sentence, verbatim, parenthetical included.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}