Added and committed three direct acceptance tests in `registry.acceptance.test.ts`, plus the missing spec and `.lore/dod.md`.

Ran:

```text
npm test -- --runInBand src/orchestration/tools/registry.acceptance.test.ts
```

Result: 3 tests failed, for the intended missing behavior:

```text
Expected calls: 0
Received calls: 2
```

```text
Expected pattern: /broken-weather/
Received function did not throw
```

Commit `6469dfa` is pushed and the branch is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}