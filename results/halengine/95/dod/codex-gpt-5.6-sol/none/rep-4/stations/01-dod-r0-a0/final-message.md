Defined and pushed the `direct` acceptance contract in commit `3187a90`.

The focused test fails for the intended reason:

```text
FAIL src/orchestration/chatOrchestratorNonErrorRejection.acceptance.test.ts
Tests: 1 failed, 1 total

Expected:
"hookCalls": 1
"hookPreservedCause": true
"hookReceivedError": true

Received:
"hookCalls": 0
"hookPreservedCause": false
"hookReceivedError": false
```

Caller rejection identity and existing `Error` identity already pass. The branch is synchronized with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}