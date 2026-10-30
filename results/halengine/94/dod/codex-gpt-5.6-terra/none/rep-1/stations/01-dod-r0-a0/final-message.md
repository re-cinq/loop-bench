Added and pushed red acceptance coverage in commit `82e0069`.

- New test: [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/d559be9798a6/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts:5)
- DoD: [.lore/dod.md](/var/tmp/loop-bench/runs/d559be9798a6/workspace/target/.lore/dod.md:1)
- Spec now defines partial-start cleanup semantics.

Ran only:

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts
```

Actual failure:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
```

The caller still receives the original error, while `onError` and `afterSession` do not run—the reported defect.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}