Added and pushed commit `8d46efb`.

New acceptance test: [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/22788f026c46/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:8), with cited guarantee in [config-hooks spec](/var/tmp/loop-bench/runs/22788f026c46/workspace/target/specs/hal-engine-config-hooks/spec.md:28) and DoD in [.lore/dod.md](/var/tmp/loop-bench/runs/22788f026c46/workspace/target/.lore/dod.md:1).

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

It fails as intended:

```text
Expected phases: ["beforeSession", "onError", "afterSession"]
Received phases: ["beforeSession"]
cleanedSession: undefined
reportedError: undefined
reportedSession: undefined
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}