Added and pushed commit `0723e9f` with:

- [`registry.acceptance.test.ts`](/var/tmp/loop-bench/runs/40bc0fe77996/workspace/target/src/orchestration/tools/registry.acceptance.test.ts)
- [`spec.md`](/var/tmp/loop-bench/runs/40bc0fe77996/workspace/target/specs/hal-engine-tool-input-validation/spec.md)
- [`.lore/dod.md`](/var/tmp/loop-bench/runs/40bc0fe77996/workspace/target/.lore/dod.md)

Ran only:

```sh
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Actual red-bar failures include:

```text
Expected: "result": StringMatching /location[\s\S]*required/i
Received: "result": "executor ran"

Expected: "result": StringMatching /location[\s\S]*string/i
Received: "result": "forecast"

Expected: "result": StringMatching /location[\s\S]*number/i
Received: "result": "forecast"

Expected pattern: /broken-weather/
Received function did not throw
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}