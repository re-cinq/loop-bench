Added and pushed the direct acceptance tests, spec anchors, and DoD in commit `ee3bee2`. The branch is clean and up to date with its upstream; `origin/main` was already merged.

The named acceptance suite ran and all four tests failed at the missing validation behavior. For example:

```text
Expected pattern: /location.*required/i
Received string:  "forecast"
```

```text
Expected pattern: /location.*string/i
Received string:  "forecast"
```

```text
Expected pattern: /units.*required/i
Received string:  "forecast"
```

```text
Expected pattern: /weather/i
Received function did not throw
```

The suite was run with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand src/orchestration/tools/registry.acceptance.test.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}