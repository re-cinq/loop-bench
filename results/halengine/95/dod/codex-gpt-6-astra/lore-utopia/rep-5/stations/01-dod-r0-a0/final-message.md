Committed and pushed `053e016` using `direct`. Added one acceptance test, linked the spec guarantee, and recorded `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```diff
- "calls": 1,
+ "calls": 0,
  "preservesCallerRejection": true,
- "receivesError": true,
+ "receivesError": false,
```

All three non-Error cases expose the reported gate. Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}