Added and pushed the direct acceptance test in [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/3251542bb7af/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts). It covers string, object, and `undefined` rejections, caller-value preservation, and existing `Error` identity. Updated [the spec](/var/tmp/loop-bench/runs/3251542bb7af/workspace/target/specs/hal-engine-config-hooks/spec.md) with its test link and recorded the strategy and facets in [`.lore/dod.md`](/var/tmp/loop-bench/runs/3251542bb7af/workspace/target/.lore/dod.md).

The named acceptance test fails for the reported behavior:

> `expect(received).toBe(expected) // Object.is equality`  
> `Expected: 1`  
> `Received: 0`

Formatted the changed files. Commit `bc6a06b` is pushed; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}