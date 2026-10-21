Added and pushed the red acceptance test and DoD on `loop-bench/94`. The test calls the real orchestrator and verifies the original rejection reaches the caller, `onError` receives the session and error, and `afterSession` receives the session.

The test failed for the reported behavior:

```text
Expected: errorSession and afterSession to equal the session, and receivedError to equal the original error
Received: errorSession: undefined, receivedError: undefined, afterSession: undefined
```

Commit `dcd8c7a` is pushed, `origin/main` was already merged, and the branch is synchronized with its upstream. I did not run the full suite, lint, or typecheck.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}