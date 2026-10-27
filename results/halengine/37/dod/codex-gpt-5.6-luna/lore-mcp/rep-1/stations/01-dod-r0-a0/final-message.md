Added and pushed commit `98d9755` with:

- Four red acceptance tests in `registry.acceptance.test.ts`
- New validation spec and traceability links
- `.lore/dod.md` using `direct` strategy
- No production code changes

Run command:

```text
npm test -- --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts
```

Actual failure:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts
Tests:       4 failed, 4 total
```

Example cause:

```text
Expected calls: 0
Received calls: 2
```

Branch is pushed, merged with `origin/main`, and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}