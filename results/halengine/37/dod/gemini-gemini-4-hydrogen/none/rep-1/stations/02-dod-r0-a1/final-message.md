Defined and verified the executable acceptance tests and Definition of Done for `re-cinq/HALEngine#37` using strategy `direct` (`.lore/dod.md`, `specs/hal-engine-tool-input-validation/spec.md`, `src/orchestration/tools/registry.acceptance.test.ts`, and `src/orchestration/chatOrchestrator.acceptance.test.ts`), fixed Prettier formatting and stale spec anchor lines (`#L84`, `#L122`, `#L166`), and pushed commit `d5077e7` to `origin/loop-bench/37` (up to date with `origin/main`).

Actual failure output from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
  ● ToolRegistry input schema validation › rejects invalid input with path and constraint, calls executor zero times, and leaks no values
    -   "badEnumHasConstraint": true,
    -   "badEnumHasUnit": true,
    -   "executorCalls": 0,
    +   "badEnumHasConstraint": false,
    +   "badEnumHasUnit": false,
    +   "executorCalls": 3,
    -   "missingHasLocation": true,
    -   "missingHasRequired": true,
    -   "wrongTypeHasLocation": true,
    -   "wrongTypeHasString": true,
    +   "missingHasLocation": false,
    +   "missingHasRequired": false,
    +   "wrongTypeHasLocation": false,
    +   "wrongTypeHasString": false,

  ● ToolRegistry input schema validation › forwards valid input with extra properties unmodified without defaults or coercion
    +     Object {
    +       "city": 42,
    +     },
    -   "rejectedHasCity": true,
    -   "rejectedHasString": true,
    +   "rejectedHasCity": false,
    +   "rejectedHasString": false,

  ● ToolRegistry input schema validation › compiles static schemas at registration, rejects broken schemas, and throws on unknown tools
    -   "brokenMentionsTool": true,
    -   "compiledAtRegister": true,
    +   "brokenMentionsTool": false,
    +   "compiledAtRegister": false,

  ● ToolRegistry input schema validation › validates a function-valued tool definition against the schema current at each call
    +       "beta": "only-beta",
    +       "alpha": "only-alpha",
    -   "rejectedAlphaMentionsAlpha": true,
    -   "rejectedBetaMentionsBeta": true,
    +   "rejectedAlphaMentionsAlpha": false,
    +   "rejectedBetaMentionsBeta": false,

FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator tool input validation recovery › feeds schema rejection back to the provider and resolves after retry
    +     Object {},
    -   "rejectionMentionsQuery": true,
    -   "rejectionMentionsRequired": true,
    +   "rejectionMentionsQuery": false,
    +   "rejectionMentionsRequired": false,

Test Suites: 2 failed, 2 total
Tests:       5 failed, 5 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}