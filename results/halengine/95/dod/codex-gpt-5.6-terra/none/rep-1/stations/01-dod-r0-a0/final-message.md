Added and pushed red acceptance contract in commit `17cf97e`.

- New test: [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/73eaaeee7a1d/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:26)
- Updated guarantee and citation: [spec.md](/var/tmp/loop-bench/runs/73eaaeee7a1d/workspace/target/specs/hal-engine-config-hooks/spec.md:24)
- Recorded DoD: [dod.md](/var/tmp/loop-bench/runs/73eaaeee7a1d/workspace/target/.lore/dod.md:1)

Ran:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
Expected hookCalls: 1; Received hookCalls: 0
```

The caller values remain unchanged, while string, object, and `undefined` rejections do not invoke `onError`, matching the reported defect. Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}