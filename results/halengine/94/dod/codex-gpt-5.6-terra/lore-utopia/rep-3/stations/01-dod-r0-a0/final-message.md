Added and pushed red acceptance contract in `aa24944`.

- New test: [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/4333310dc5b9/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts:11)
- Updated target guarantee and citation: [spec.md](/var/tmp/loop-bench/runs/4333310dc5b9/workspace/target/specs/hal-engine-config-hooks/spec.md:17)
- Recorded direct-strategy DoD: [dod.md](/var/tmp/loop-bench/runs/4333310dc5b9/workspace/target/.lore/dod.md:1)

Ran only:

```text
node scripts/lore-run-test.mjs 'src/orchestration/beforeSessionFailure.acceptance.test.ts::a beforeSession failure notifies onError then afterSession, leaves later phases unstarted, and rejects with the same error'
```

Actual failure:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
onErrorFailure: undefined
onErrorSession: undefined
```

The branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}