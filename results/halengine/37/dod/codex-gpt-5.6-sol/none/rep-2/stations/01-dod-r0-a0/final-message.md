Implemented and pushed the `direct` acceptance-test contract in commit `b0de4ba`.

Added:

- `registry.acceptance.test.ts` with three behavioral tests
- Linked tool-input-validation specification
- `.lore/dod.md` defining implementation facets

Targeted run: 3 tests failed as expected. Key failure output:

```text
"executions": 3
"missing": "executor ran"
"wrongEnum": "executor ran"
"wrongType": "executor ran"

"invalidRegistration": "did not throw"

"executions": 3
"staleInput": {
  "result": "ok"
}

Test Suites: 1 failed, 1 total
Tests:       3 failed, 3 total
```

The branch is synchronized with `origin/main`, pushed, and `0` commits ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}