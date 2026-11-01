Added and pushed commit `e3d90d5` with the red acceptance contract:

- [registry.acceptance.test.ts](/var/tmp/loop-bench/runs/47c54a5e3610/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [tool-input-validation spec](/var/tmp/loop-bench/runs/47c54a5e3610/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [.lore/dod.md](/var/tmp/loop-bench/runs/47c54a5e3610/workspace/target/.lore/dod.md)

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Actual red result: `Tests: 5 failed, 5 total`. Representative failures show the current behavior directly:

```text
Expected pattern: /location.*required|required.*location/i
Received string: "should not execute"
```

```text
Expected pattern: /broken-weather/
Received function did not throw
```

```text
Expected: StringMatching /location.*required|required.*location/i
Received: "forecast for undefined"
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}