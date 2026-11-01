Committed and pushed `7911063` using `direct`. Added one acceptance test, the DoD, and the linked spec guarantee. No production code changed. Branch is current with `main` and its upstream.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```diff
- "hookCalls": 1,
- "hookReceivedError": true,
+ "hookCalls": 0,
+ "hookReceivedError": false,
```

```text
Tests:       1 failed, 1 total
```

The test triggers the shared catch through a lifecycle hook without provider doubles; this limitation is documented.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}