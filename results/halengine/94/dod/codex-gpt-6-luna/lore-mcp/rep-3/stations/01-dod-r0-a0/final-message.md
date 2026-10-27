Added and pushed one acceptance test and documented the DoD in commit `266b37e`. The branch is up to date with its upstream; `origin/main` merged cleanly and was already up to date.

The test fails for the ticket’s stated reason: the original error reaches the caller, but neither hook runs. Jest reported:

```text
Expected calls: [onError, afterSession]
Received calls: []
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The spec link points to the test declaration at `#L10`. The anchor script skipped that spec because its anchor set differs from `origin/main`; I verified the line manually. The ticket also asks for a changelog entry and an explicit spec statement about `afterSession`; those are not included in this test-only DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}