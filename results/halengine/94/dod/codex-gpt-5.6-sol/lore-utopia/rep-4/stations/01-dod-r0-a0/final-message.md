Defined and pushed the direct acceptance contract in commit `b0a8b17`.

The isolated test fails for the intended reason:

```text
Expected events:
["started:before-session-failure", "onError", "afterSession:before-session-failure"]

Received events:
["started:before-session-failure"]

Expected onErrorArguments: [session, failure]
Received onErrorArguments: []
```

The original `beforeSession` error still reaches the caller, confirming the missing behavior is specifically `onError` and `afterSession`.

Branch is merged with `origin/main`, pushed, and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}