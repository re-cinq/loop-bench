Committed and pushed `10ebb8a` using `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed. Branch is current with main and fully pushed.

Ran only the new acceptance file. Actual failure:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
- "hookCalls": 1,
+ "hookCalls": 0,
Tests:       1 failed, 1 total
```

The failure confirms non-Error rejections bypass `onError` while preserving the caller’s original rejection.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}