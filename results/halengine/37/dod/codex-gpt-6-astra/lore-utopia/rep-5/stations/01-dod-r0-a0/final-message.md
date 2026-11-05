Committed and pushed `499e6e2` with three `direct` acceptance tests, spec links, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only `registry.acceptance.test.ts`. Actual failures include:

```text
+ "missing": "{}"
+ "compiledAtRegistration": false
+ "registrationError": ""
+ "compiled": false

Tests:       3 failed, 3 total
```

The DoD records the remaining orchestrator integration requirement; its requested stub-provider test conflicts with this task’s no-stubs rule.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}