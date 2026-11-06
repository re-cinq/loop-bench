Pushed and confirmed up to date.

**What was done:**

Strategy: `direct` — the seam is the `catch` block in `src/orchestration/chatOrchestrator.ts:150`, which is directly callable from tests.

**Acceptance test** at `src/orchestration/chatOrchestrator.acceptance.test.ts`: three parameterised cases (string, plain object, `undefined`) each assert:
1. `onError` was called (currently fails — `capturedError` is `undefined`)
2. The argument to `onError` is an `Error` instance
3. Its `.cause` is the original non-Error rejection value
4. The caller's `catch` receives the original rejection unchanged

**Actual failure output (all 3 cases):**
```
expect(received).toBeDefined()
Received: undefined
  at src/orchestration/chatOrchestrator.acceptance.test.ts:59:29
```

The tests fail because the current `instanceof Error` gate at line 150 silently skips `onError` for non-Error rejections — exactly the bug the ticket reports.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}