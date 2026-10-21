Implemented the undefined-rejection facet: `onError` now receives an `Error` with the original rejection as `cause`, while the caller still receives the original value. Updated the spec and DoD, and committed and pushed as `604b627`. The branch is up to date with its upstream.

The new test failed before the change and passed after it. Regressions: 0 observed; the DoD acceptance tests were not run here. Remaining facets: confirm the existing `Error` tests and add the changelog entry. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving the caller rejection","tdd_next":"Confirm existing Error-instance tests; add the Unreleased changelog entry"}}