The branch already had a red acceptance-test commit from an earlier pass (`3ecce7a`). I kept its two tests, added the spec they cite, and pushed. The branch is in sync with `origin/loop-bench/37`, and the merge with `origin/main` needed nothing.

**Central claim (quoted in `.lore/dod.md`):** "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`"

**Strategy: `direct`.** `ToolRegistry.execute` is already callable, so both tests exercise the real entry point and fail on behaviour.

**Red bar, run here:** `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`

```
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry.execute input validation › rejects input missing a required property and does not invoke the executor
    Expected: 0
    Received: 1
      26 |     expect(executorCalls).toBe(0);
  ● ToolRegistry.execute input validation › rejects a wrong-typed property naming its path and expected type, never echoing the value
    Expected: 0
    Received: 1
      41 |     expect(executorCalls).toBe(0);
Tests:       2 failed, 2 total
```

Both fail because the executor runs on input the schema rejects, which is the claim in the ticket.

**What changed in this pass:**
- New `specs/hal-engine-tool-input-validation/spec.md` (Status `Draft`, since nothing is implemented). It holds the two statements these tests validate, each with a `([validated by ...])` link to `registry.acceptance.test.ts#L16` and `#L31`. The ticket names this spec as something the issue creates, so I wrote it.
- `.lore/dod.md` note updated to match, and both files run through prettier.

**Decisions for you to check:**
- The ticket lists about a dozen criteria. I kept the two core tests as "done when" and put the rest (register-time compile, per-call schema resolution, the chat-loop test, unknown-tool pin, log redaction, docs, CHANGELOG, build) under Facets. Passing the two tests does not finish the ticket, and the Facets list says so. If you want the full ticket to be one DoD, it would exceed the five-test limit and should be split.
- I did not run the rest of the suite, lint, or typecheck, as instructed. The new spec links depend on the line numbers `#L16` and `#L31`; they are correct as written but CI's `check:spec-links` is the judge.
- The lore MCP tools (`lore_*`) are not in my toolset, so I did not query them or pass `repo`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}