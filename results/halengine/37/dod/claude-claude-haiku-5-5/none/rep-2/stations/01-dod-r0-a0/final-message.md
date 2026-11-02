The ticket is expressed as two red acceptance tests, committed and pushed to `loop-bench/37`. The branch is in sync with its upstream and the merge with `origin/main` produced nothing to merge.

**Strategy: `direct`.** `ToolRegistry.register` and `ToolRegistry.execute` are already the real entry points, so the tests call them with no mocks.

**Tests** (`src/orchestration/tools/registry.acceptance.test.ts`):
1. Input missing a required `location` is answered with a result naming `location`, and the executor is never called.
2. A number where a string is required is answered with a result naming `location` and `string`, without the value `31337`, and the executor is never called.

**Red bar.** I ran it with the explicit path form, because the pod's hook refuses a bare `npm test`:

```
$ node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry.execute validates input against inputSchema › rejects input missing a required property and names it, without calling the executor
    expect(received).toContain(expected) // indexOf
    Expected substring: "location"
    Received string:    "a confident forecast"
  ● ToolRegistry.execute validates input against inputSchema › rejects a wrong-typed property naming its path and expected type, never the offending value
    expect(received).toContain(expected) // indexOf
    Expected substring: "location"
    Received string:    "a confident forecast"
Tests:       2 failed, 2 total
```

Both fail for the reason the ticket gives: the executor runs on the malformed input and returns its forecast.

**Other files:**
- `.lore/dod.md` quotes the central claim verbatim, records the `direct` strategy, and lists the other acceptance criteria as facets.
- `specs/hal-engine-tool-input-validation/spec.md` is new, with two statements that cite the tests. The ticket requires the statements to exist before the tests, and this file did not exist. Its Status is `Draft`.
- I ran no lint, typecheck or build. I ran the formatter on the test file only.

**Choices and gaps:**
- I kept two tests and left out criteria that would pass today. The unknown-tool throw and extra-property pass-through already behave as specified, so they cannot be red. The other criteria (compile-at-register, per-call resolution, compile-once, orchestrator retry, logs, docs, changelog, `ajv` dependency) are facets for later rounds.
- The ticket's `npm test` and the `hal-engine-jest` CI job use Jest, not Vitest, so the test file uses Jest globals with no imports, matching the existing suites.
- No `lore_*` tools were available to me, so I did not query lore context or record memory.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}