Added and pushed red acceptance coverage for #94.

- New test: `src/orchestration/chatOrchestrator.acceptance.test.ts`
- Recorded direct strategy and facets in `.lore/dod.md`
- Updated the hooks spec with the intended guarantee and validation link.
- No production code changed.

Targeted test command:

```sh
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --coverage=false
```

Actual failure:

```text
Expected callOrder: ["beforeSession", "onError", "afterSession"]
Received callOrder: ["beforeSession"]
afterSessionEntryRoles: undefined
onErrorReceivedOriginalFailure: false
```

Committed as `eaf34d6` and branch is pushed and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}