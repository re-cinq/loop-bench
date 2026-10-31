Added and pushed red acceptance coverage in commit `a173efb`.

Ran:

`npm test -- src/orchestration/beforeSessionFailure.acceptance.test.ts`

Actual failure:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
reportedError: undefined
reportedSession: undefined
```

The branch is merged with `origin/main` and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}