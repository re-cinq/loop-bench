Added and pushed commit `1cd3322` with:

- One direct acceptance test.
- `.lore/dod.md`.
- Spec traceability update.

Test run:

```text
FAIL src/orchestration/beforeSessionFailure.acceptance.test.ts
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
```

Branch is clean and synchronized with upstream (`0 0`). No production code changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}