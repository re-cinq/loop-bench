Committed and pushed `e5dedaf` using strategy `direct`. Added one acceptance test, spec traceability, and `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runInBand --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

Actual failure:
```text
-     "hookCalls": 1,
+     "hookCalls": 0,
Tests:       1 failed, 1 total
```

All three rejection values fail through both entry points. Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}