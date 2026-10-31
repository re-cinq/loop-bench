Added and pushed `fe9068f` with the red acceptance test and Definition of Done.

The test fails for the ticket’s stated reason:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
reportedError: false
reportedSession: false
```

It ran only:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}