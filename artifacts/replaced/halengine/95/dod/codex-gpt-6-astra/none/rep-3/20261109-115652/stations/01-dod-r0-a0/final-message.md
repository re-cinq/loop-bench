Committed and pushed `7ef5921` using `direct`. Added one acceptance test, the spec guarantee/link, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runInBand --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

Actual failure:
```text
-     "calls": 1,
+     "calls": 0,
Tests:       1 failed, 1 total
```

All non-Error cases reproduce the reported omission. Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}