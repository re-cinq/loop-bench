The Definition of Done for #37 was already on the branch from an earlier round, in commit `234b762`, and it's pushed. I checked it and changed nothing, because it already meets the contract.

**What's there**
- `.lore/dod.md` opens with the ticket's claim, quoted verbatim: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`". The strategy is `direct`, because `ToolRegistry.register`/`execute` and `createChatOrchestrator(...).processMessage` can be called as they are today.
- `src/orchestration/tools/registry.acceptance.test.ts` has four acceptance tests. Each one is cited from a statement in `specs/hal-engine-tool-input-validation/spec.md`. `node scripts/check-spec-links.mjs` reports `misplaced: 0`, and `check-spec-anchor-names` reports that all 398 citations name the test they point at.
- The branch already contains `origin/main`, so nothing needed merging, and `HEAD` matches `origin/loop-bench/37` (`234b762`).

**Red bar**

Command: `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`

All four fail because nothing validates the input:
```
● … › rejects input missing a required property with a result naming it, without invoking the executor
    -   "executorCalls": 0,
    -   "result": StringMatching /location[\s\S]*required|required[\s\S]*location/,
    +   "executorCalls": 1,
    +   "result": "Forecast for undefined",

● … › rejects a wrong-typed property naming its path and expected type, never its value in result or logs
    -   "executorCalls": 0,
    +   "executorCalls": 1,
    -   "leaksValueInResult": false,
    -   "namesPathAndType": true,
    +   "leaksValueInResult": true,
    +   "namesPathAndType": false,

● … › throws at register time for an uncompilable schema, naming the tool
    Expected pattern: /broken_tool/
    Received function did not throw

● ChatOrchestrator tool loop … › feeds the rejection to the provider, runs the corrected retry, and resolves processMessage
        "executorCalls": Array [
    +     Object {},
          Object { "location": "Paris" },
    -   "secondRoundSawRejection": true,
    +   "secondRoundSawRejection": false,

Tests:       4 failed, 4 total
```

**Left for the next rounds:** Some acceptance criteria are listed as Facets in `.lore/dod.md` rather than as acceptance tests, because the ticket asks for them in a new `registry.test.ts` and in `chatOrchestrator.test.ts`. They are:
- extra properties pass through unchanged, checked with `toEqual`, exactly once;
- a static schema is compiled once across ten calls;
- a function-valued definition is validated against the schema current at that call;
- `Unknown tool:` still throws.

The docs, CHANGELOG and MINOR version-bump criteria are listed there too.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}