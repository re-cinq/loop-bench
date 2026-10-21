Added one direct acceptance test covering string, plain-object, and `undefined` provider rejections. It fails because `onError` is called zero times for all three, while each original rejection still reaches the caller unchanged.

Failure excerpt:

```text
"callerReason": "provider failed",
-"calls": 1,
-"cause": "provider failed",
-"hookError": true,
+"calls": 0,
+"cause": undefined,
+"hookError": false,

"callerReason": {"code": "E_PROVIDER"},
-"calls": 1,
+"calls": 0,

"callerReason": undefined,
-"calls": 1,
+"calls": 0,
```

Updated the spec statement and `.lore/dod.md`. Formatted the changed files and ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Committed as `0ff8a4e`, pushed to `origin`, merged `origin/main` (already up to date), and confirmed the branch is even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}