Added and pushed red acceptance coverage in commit `540672b`.

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/0316a9c496b6/workspace/target/src/orchestration/tools/registry.acceptance.test.ts) — four direct registry acceptance cases.
- [spec.md](/var/tmp/loop-bench/runs/0316a9c496b6/workspace/target/specs/hal-engine-tool-input-validation/spec.md) — linked normative statements.
- [dod.md](/var/tmp/loop-bench/runs/0316a9c496b6/workspace/target/.lore/dod.md) — direct-strategy DoD.

Ran only:

```sh
npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Actual red output includes:

```text
Expected "calls": 1
Received "calls": 3
Received "missing": "executor ran"
Received function did not throw
Received "staleStringLocation": "forecast"
```

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}