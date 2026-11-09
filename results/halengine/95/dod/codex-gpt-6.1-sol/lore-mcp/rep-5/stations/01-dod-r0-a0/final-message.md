Committed and pushed `d4cbf0f` using strategy `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```diff
- "hookCalls": 1,
- "hookReceivedError": true,
- "hookReceivedOriginalCause": true,
+ "hookCalls": 0,
+ "hookReceivedError": false,
+ "hookReceivedOriginalCause": false,
```

```text
Tests:       1 failed, 1 total
```

The caller receives the original rejection; the missing notification causes the failure. Branch is current with `origin/main`, pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}