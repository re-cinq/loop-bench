Committed and pushed `79d53b9` using `direct`: three acceptance tests, linked spec, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `registry.acceptance.test.ts`. Actual failures included:

```text
- "registrationError": StringContaining "weather",
+ "registrationError": "",
```

Invalid inputs returned `"forecast"` and reached the executor.

```text
Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}