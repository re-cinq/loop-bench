Added the acceptance test and DoD in commit `e2e29bc`, pushed to `origin`, and confirmed the branch is up to date with its upstream. `origin/main` was already merged.

The named test failed for the ticket’s stated behavior:

```text
expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

It ran only `src/orchestration/nonErrorRejection.acceptance.test.ts`. The repo’s Lore test-list tool reported “No test-command manifest declared for this repo,” so I linked the test by name in the spec instead.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}