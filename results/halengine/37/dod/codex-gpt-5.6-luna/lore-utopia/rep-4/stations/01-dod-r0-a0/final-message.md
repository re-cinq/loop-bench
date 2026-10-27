Added and pushed commit `925780a` with:

- Three direct acceptance tests in `registry.acceptance.test.ts`
- Feature spec with traceability links
- `.lore/dod.md` using `direct` strategy

Ran only:

```bash
NODE_OPTIONS=--experimental-vm-modules npx jest --runInBand src/orchestration/tools/registry.acceptance.test.ts
```

Expected red failures included:

```text
Expected pattern: /location.*required/i
Received string:  "executed"

Expected: 1
Received: 0
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}