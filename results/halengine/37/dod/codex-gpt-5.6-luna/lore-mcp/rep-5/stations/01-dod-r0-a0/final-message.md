Defined and pushed the `direct` DoD with five acceptance tests in:

- `src/orchestration/tools/registry.acceptance.test.ts`
- `.lore/dod.md`
- `.specify/spec.md` with traceability links

Command run:

```text
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts --runInBand --silent
```

Result: 5 tests failed, including:

```text
Expected calls: 0; received calls: 2
Expected compiledOnce: true; received compiledOnce: false
Expected registration to throw /broken-weather/; function did not throw
Expected validation text; received "unreachable"
```

Committed as `b48ba61`, pushed, merged with `origin/main`, and verified branch is synchronized.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}