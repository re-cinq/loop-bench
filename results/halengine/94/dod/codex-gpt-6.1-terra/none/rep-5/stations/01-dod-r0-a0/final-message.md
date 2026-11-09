Added and pushed the direct acceptance test and definition of done. The test checks that a `beforeSession` error reaches `onError`, then `afterSession`, and is rethrown unchanged. The spec now states that cleanup can run before user input or provider processing.

The named test fails for the ticket’s reported behavior:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession failure lifecycle › reports and cleans up a failed beforeSession before rejecting with the same error

    -       "onError",
    -       [Error: allocation failed],
    -       "afterSession",
        "rejection": [Error: allocation failed],

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Commit `39dfa19` is pushed, the branch is up to date with `origin/main`, and the working tree is clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}