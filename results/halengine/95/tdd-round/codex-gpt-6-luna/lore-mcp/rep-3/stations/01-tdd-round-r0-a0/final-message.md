Implemented and pushed `b4480ed`. The focused test failed before the change and passed afterward; it confirms `onError` receives an `Error` with the original rejection as `cause`, while the caller still receives the original value. Updated the spec and ticked the matching DoD facet.

No regressions were reported by Lore, which had no CI record for this branch. One red test was mine; zero regressions. The next facets are confirming the existing `Error` tests and adding the changelog entry. Branch is up to date with its upstream. No unrelated findings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrap non-Error rejections for onError while preserving cause and caller rejection","tdd_next":"Confirm existing Error-instance tests, then add the Unreleased changelog entry"}}