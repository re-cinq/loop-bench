Committed and pushed `1c51f59` using `direct`. Added one acceptance test, the linked spec guarantee, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
- "calls": 1,
+ "calls": 0,
- "preservedReason": true,
+ "preservedReason": false,

Tests:       1 failed, 1 total
```

All three non-Error values bypass `onError`; caller rejection identity is preserved. Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}