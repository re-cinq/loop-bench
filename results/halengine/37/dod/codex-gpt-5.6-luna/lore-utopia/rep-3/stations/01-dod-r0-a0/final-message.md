Added and pushed:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/aaf141153e6a/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [.lore/dod.md](/var/tmp/loop-bench/runs/aaf141153e6a/workspace/target/.lore/dod.md)

Strategy: `direct`. Commit `f758c61`; branch is pushed and synchronized with `origin/main`.

Acceptance run failed as intended:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
Tests:       4 failed, 4 passed
```

Failures include returned `"forecast"` for invalid input, no registration-time schema error, stale dynamic schemas, and zero schema reads.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}