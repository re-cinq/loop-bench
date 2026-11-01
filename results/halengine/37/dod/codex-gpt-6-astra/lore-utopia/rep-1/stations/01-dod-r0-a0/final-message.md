Committed and pushed `bc9996d` with three acceptance tests, spec links and `.lore/dod.md`. No production code changed. Branch is current with `main` and fully pushed.

Ran only `registry.acceptance.test.ts`. Actual failures:

```text
- "rejectedCalls": 0,
+ "rejectedCalls": 3,

- "compiledAtRegistration": true,
+ "compiledAtRegistration": false,

- "compiled": true,
+ "compiled": false,

Tests:       3 failed, 3 total
```

The complete DoD remains blocked: the required orchestrator retry test needs a scripted provider, prohibited by the no-stubs rule.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Allow a scripted provider for the required rejected-call/corrected-retry integration test, or provide a deterministic real provider seam that can exercise that sequence without stubs."}}