Committed and pushed `9796202` using `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `main` and its upstream.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. Actual failure excerpt:

```text
        "order": Array [
          "beforeSession",
-         "onError",
-         "afterSession",
        ],
        "originalRejection": true,
-       "remainingTokens": 0,
+       "remainingTokens": 1,

Tests:       1 failed, 1 total
```

Descriptor tooling lacks a `spec` field; the anchor is stamped in the test and linked from the spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}