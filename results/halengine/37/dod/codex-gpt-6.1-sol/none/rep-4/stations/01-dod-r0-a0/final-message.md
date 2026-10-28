Committed and pushed `122043a` using strategy `direct`. Added three acceptance tests, spec links, and `.lore/dod.md`. No production code changed; branch is current with `origin/main`.

Ran only `registry.acceptance.test.ts`. Actual failure excerpts:

```text
+ "result": "forecast",
+ "compiledAtRegistration": false,
+ "registrationError": "",
+ "compiled": false,

Tests:       3 failed, 3 total
```

Failures confirm missing input rejection, registration-time compilation, and dynamic-schema validation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}