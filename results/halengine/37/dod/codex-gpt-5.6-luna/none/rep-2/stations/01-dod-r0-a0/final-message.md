Added and pushed commit `4bd1cb7` containing:

- New registry acceptance tests
- New validation spec with traceability links
- `.lore/dod.md` using `direct` strategy

Ran only:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/tools/registry.acceptance.test.ts --runInBand
```

Expected failures include:

```text
Expected pattern: /location.*required/i
Received string:  "forecast"

Received function did not throw
```

Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}