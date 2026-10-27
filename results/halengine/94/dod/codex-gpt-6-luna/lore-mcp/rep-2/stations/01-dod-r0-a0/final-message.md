Added and pushed commit `59563d6` with one acceptance test and the updated spec and DoD. The test exercises `processMessage` and fails because neither hook runs when `beforeSession` throws.

The only test run was `npm test -- --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`. It failed with:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
  ● a beforeSession failure › reaches onError and afterSession before the unchanged rejection returns

    Object {
      "afterSessionArgument": undefined,
      "errorArguments": undefined,
      "order": Array [
        "beforeSession",
      ],
      "rejection": [Error: setup failed],
    }
```

The branch is clean and up to date with its upstream; `origin/main` was already merged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}