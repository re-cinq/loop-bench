Added and pushed one acceptance test for ticket #94, with the linked spec guarantee and a `direct` Definition of Done. No production code changed. The branch is up to date with `origin/main` and its upstream.

Ran only `npm test -- --runInBand --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`. It fails for the reported behavior:

> `- "onErrorReceivedOriginal": true`  
> `+ "onErrorReceivedOriginal": false`

The failure also shows the expected `onError` and `afterSession` calls missing, while the original rejection reaches the caller.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}