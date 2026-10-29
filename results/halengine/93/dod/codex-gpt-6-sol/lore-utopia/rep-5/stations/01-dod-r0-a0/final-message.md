**Strategy: `direct`.** I committed and pushed two acceptance tests in [usage.acceptance.test.ts](/var/tmp/loop-bench/runs/879fc9110cb3/workspace/target/src/orchestration/usage.acceptance.test.ts). They exercise two tool rounds through the orchestrator and cover both complete and missing usage reports. The [spec](/var/tmp/loop-bench/runs/879fc9110cb3/workspace/target/specs/hal-engine-config-hooks/spec.md) links to them, and [.lore/dod.md](/var/tmp/loop-bench/runs/879fc9110cb3/workspace/target/.lore/dod.md) records the remaining work.

I ran only `npm test -- --runInBand --runTestsByPath src/orchestration/usage.acceptance.test.ts`. Both tests failed for the reported undercount:

> Expected `{inputTokens: 51, outputTokens: 10, totalTokens: 61}`; received `{inputTokens: 23, outputTokens: 5, totalTokens: 28}`.  
> Expected partial total `{inputTokens: 34, outputTokens: 7, totalTokens: 41}`; received `{inputTokens: 23, outputTokens: 5, totalTokens: 28}`.

Commit `50151aa` is pushed. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}