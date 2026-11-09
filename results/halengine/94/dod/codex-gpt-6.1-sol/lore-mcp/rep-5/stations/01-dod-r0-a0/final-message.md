Committed and pushed `30be623` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
- "cleanupSessionMatches": true,
+ "cleanupSessionMatches": false,
- "errorSessionMatches": true,
+ "errorSessionMatches": false,
-   "onError",
-   "afterSession",
- "resourcesRemaining": 0,
+ "resourcesRemaining": 1,

Tests:       1 failed, 1 total
```

The original rejection is preserved; the missing hooks cause the red bar.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}