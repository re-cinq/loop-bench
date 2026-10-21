Added and pushed commit `b16e58f` with the direct acceptance test, DoD, and spec link. The branch is up to date with `origin/main` and its upstream.

The test failed for the ticket’s stated reason:

> `rejection: [Error: beforeSession failed]`  
> `observed: Array []`

It ran `onError` and `afterSession` zero times, while preserving the caller’s rejection. Strategy: `direct`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}