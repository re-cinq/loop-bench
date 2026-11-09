Committed and pushed `b7f9206` with three acceptance tests, linked spec statements, and `.lore/dod.md`. Strategy: `direct`. No production code changed; branch is synchronized.

Actual failure output:

```text
- "calls": 0,
+ "calls": 1,
- "compiledAtRegistration": true,
+ "compiledAtRegistration": false,
- "registrationError": StringContaining "broken_weather",
+ "registrationError": "",

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The DoD records the remaining integration coverage gap: the requested stub-provider retry test conflicts with the no-stubs instruction.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}