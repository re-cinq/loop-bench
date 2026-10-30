Added and pushed red acceptance contract in `4ab8182`.

- New registry and tool-loop acceptance tests.
- Added linked draft spec and `.lore/dod.md`.
- Ran only:
  `npm test -- src/orchestration/tools/registry.acceptance.test.ts src/orchestration/chatOrchestrator.acceptance.test.ts`

Actual failure output includes:

```text
Expected "executorCalls": 0
Received "executorCalls": 3
```

```text
Expected "brokenSchemaNamesTool": true
Received "brokenSchemaNamesTool": false
```

```text
Expected "executorCalls": 0
Received "executorCalls": 1
```

All 4 acceptance tests fail because schema validation is absent, while valid input and unknown-tool behavior are also pinned.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}