Added and pushed commit `915a711` with:

- Four acceptance tests in `registry.acceptance.test.ts`
- New traceability spec
- `.lore/dod.md` using `direct` strategy

Command run:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand src/orchestration/tools/registry.acceptance.test.ts
```

Actual failures include:

```text
Expected pattern: /location.*required/i
Received string:  "should not run"
```

```text
Expected pattern: /broken-weather/
Received function did not throw
```

```text
Expected pattern: /location.*required/i
Received string: "...tool_result...forecast for undefined..."
```

Changes are committed, pushed, and the branch is synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}