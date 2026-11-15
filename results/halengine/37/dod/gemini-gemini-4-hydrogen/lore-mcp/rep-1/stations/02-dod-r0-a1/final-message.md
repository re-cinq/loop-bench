Verified the Definition of Done, spec, and red acceptance tests on `loop-bench/37` (commit `c63e8d0`, up to date with `origin/main` and `origin/loop-bench/37`, clean working tree):

- `.lore/dod.md` — `direct` strategy quoting ticket #37's claim, listing the 5 acceptance tests, facets, and out-of-scope items
- `specs/hal-engine-tool-input-validation/spec.md` — `Status: In Progress`, linking all 5 acceptance tests and keeping the remaining 2 statements (`compile once` and `Unknown tool: <name>`) unlinked for the implementation round
- `src/orchestration/tools/registry.acceptance.test.ts` (4 tests) & `src/orchestration/chatOrchestrator.acceptance.test.ts` (1 test) — formatted with Prettier and passing `check-spec-links.mjs`, `check-spec-anchor-names.mjs`, `repoint-spec-anchors.mjs --check origin/main`, and `check-spec-status.mjs`

Ran `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator tool input validation acceptance › returns a validation rejection to the provider so processMessage resolves on a corrected retry

    -   "executedCalls": 1,
    +   "executedCalls": 2,
        "finalText": "It is sunny in Berlin.",
    -   "firstResultMentionsLocation": true,
    +   "firstResultMentionsLocation": false,

FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input validation acceptance › returns a ToolResponse naming the missing required field or enum constraint without calling the executor

    -   "enumMentionsUnits": true,
    -   "executorCalls": 0,
    -   "missingMentionsLocation": true,
    -   "missingMentionsRequired": true,
    +   "enumMentionsUnits": false,
    +   "executorCalls": 2,
    +   "missingMentionsLocation": false,
    +   "missingMentionsRequired": false,

  ● ToolRegistry input validation acceptance › rejects a wrong-typed field naming path and expected type without coercing or leaking values

    -   "executorCalls": 0,
    +   "executorCalls": 1,
    -   "mentionsExpectedType": true,
    -   "mentionsFieldPath": true,
    +   "mentionsExpectedType": false,
    +   "mentionsFieldPath": false,

  ● ToolRegistry input validation acceptance › throws at register time for a schema that cannot be compiled and names the tool

    Expected pattern: /broken_schema_tool/
    Received function did not throw

  ● ToolRegistry input validation acceptance › validates dynamic tool definitions against the current schema and forwards extra properties unmodified

    -   "staleMentionsPostalCode": true,
    +   "staleMentionsPostalCode": false,

Test Suites: 2 failed, 2 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}