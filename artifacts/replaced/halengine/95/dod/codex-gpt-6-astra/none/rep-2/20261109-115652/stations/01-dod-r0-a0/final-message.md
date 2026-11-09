Committed and pushed `43444d7` using `direct`. Added one acceptance test, the spec guarantee/link, and `.lore/dod.md`. No production code changed; branch is current with `main` and upstream.

Ran only the acceptance file. Actual failure:

```text
- "hookCalls": 1,
+ "hookCalls": 0,
- "hookReceivedError": true,
+ "hookReceivedError": false,
  "originalRejection": true,

Tests:       1 failed, 1 total
```

The test exercises the shared catch through a real rejecting lifecycle hook, without provider doubles.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}