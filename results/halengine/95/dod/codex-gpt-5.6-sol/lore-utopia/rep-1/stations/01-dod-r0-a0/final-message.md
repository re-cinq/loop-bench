Implemented and pushed the `direct` acceptance-test contract.

Added:

- `src/orchestration/chatOrchestrator.acceptance.test.ts`
- `.lore/dod.md`
- Updated the linked spec with traceability

Test command:

`npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

Expected red-bar output:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts

Expected hookErrors to contain cause-preserving Error objects.
Received hookErrors: Array []

Tests: 1 failed, 1 total
```

The failure confirms all three original rejection values—string, plain object, and `undefined`—still propagate, while `onError` is never called.

Commit `263b752` is pushed, merged with current `origin/main`, and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}