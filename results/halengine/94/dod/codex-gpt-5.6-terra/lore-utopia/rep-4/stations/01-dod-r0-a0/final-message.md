Added and pushed red acceptance test commit `ab83dc1`.

- New [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/9d5b2e1046b5/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:18) exercises `processMessage` directly.
- Added the traceable desired guarantee to the config-hooks spec and [DoD](/var/tmp/loop-bench/runs/9d5b2e1046b5/workspace/target/.lore/dod.md:1).
- `origin/main` merge: already up to date; branch is pushed and not ahead.

Red test output:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
Expected callOrder: ["beforeSession", "onError", "afterSession"]
Received callOrder: ["beforeSession"]
Received onErrorFailure: undefined
Received afterSessionEntries: undefined
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}