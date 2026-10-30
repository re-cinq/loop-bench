Implemented and pushed the direct acceptance-test contract in commit `4ce7d8b`.

Added:

- `src/orchestration/tools/registry.acceptance.test.ts`
- `specs/hal-engine-tool-input-validation/spec.md`
- `.lore/dod.md`

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts --runInBand
```

Actual result:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts

missingMentionsRequiredLocation: false
wrongTypeMentionsPathAndType: false
received: [{}, {location: 491234567890, units: "metric"}, ...]

compiledAtRegistration: false
invalidSchemaNamedTool: false

executions: 3
staleInputNamesExpectedType: false

executions: 2
rejectionReachedProvider: false

Test Suites: 1 failed, 1 total
Tests:       4 failed, 4 total
```

The branch is merged with current `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}