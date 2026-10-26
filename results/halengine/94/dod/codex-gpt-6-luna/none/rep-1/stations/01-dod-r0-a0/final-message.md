Added and pushed one acceptance test in commit `59f3e96`. It fails for the ticket’s stated reason: the caller receives the same error, but only `beforeSession` runs; `onError` and `afterSession` do not.

Failure output:

```text
Expected: ["beforeSession", "onError", "afterSession"]
Received: ["beforeSession"]
```

Updated the spec to say `afterSession` must tolerate a turn that never started. Formatted the changed files, fetched and merged `origin/main` (already up to date), and confirmed the branch is clean and even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}