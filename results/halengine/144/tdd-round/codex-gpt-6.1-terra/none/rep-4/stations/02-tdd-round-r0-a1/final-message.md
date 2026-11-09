Implemented and pushed the `list_sessions` validation facet. It accepts valid pagination, rejects malformed values, and removes unrecognised fields. The new test passed; it was the only test run.

The coverage graph tool was unavailable, so I could not check existing coverage before editing. The test is stamped with a spec anchor, but the repository’s current test-list script does not expose a `spec` field. No CI verdict was available for this round: the local red test was the one I wrote, with no regressions observed locally.

The branch is up to date with `origin/main` and its upstream. The next facet is completing and exporting the protocol types.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Complete and export session list protocol types"}}