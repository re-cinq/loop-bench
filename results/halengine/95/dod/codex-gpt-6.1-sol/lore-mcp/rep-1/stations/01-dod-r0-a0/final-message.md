Committed and pushed `fb5b4e3` using strategy `direct`. Added one acceptance test, linked the spec guarantee, and recorded `.lore/dod.md`. No production code changed.

Ran only:
```sh
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts --runInBand
```

Actual failure:
```text
-     "hookCalls": 1,
+     "hookCalls": 0,
Tests:       1 failed, 1 total
```

String, object and `undefined` rejections bypass `onError`; caller values remain unchanged. Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}