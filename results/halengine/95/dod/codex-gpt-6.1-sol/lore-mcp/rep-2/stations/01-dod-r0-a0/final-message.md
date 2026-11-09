Committed and pushed `9fdd967` using strategy `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed. Branch is current with `main` and synced upstream.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure:
```diff
- "calls": 1,
+ "calls": 0,
```
```text
Tests:       1 failed, 1 total
```

Non-Error rejections bypass `onError`; caller rejection identity remains unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}