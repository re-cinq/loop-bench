**Strategy: `direct`.** I committed and pushed the acceptance test and Definition of Done in commit `89a392f`. The branch is up to date with `origin/main` and its upstream.

The new test fails for the reported reason. Jest shows the original rejections reaching the caller while `onError` is skipped for the string, plain object, and `undefined`:

```text
-     "hookCalls": 1,
+     "hookCalls": 0,
```

The existing `Error` case passes within that test. The test command was `npm test -- --runInBand --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}