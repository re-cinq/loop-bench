Fixed the two reported lint findings and added the changelog entry. The acceptance test’s assertions are unchanged. Commit `e0206d3` is pushed, and the branch is up to date with both `origin/main` and its upstream.

No tests ran locally: this round repaired CI findings without writing a new test, and the requested existing-test verification remains for CI. The previous CI verdict reported zero red tests and zero regressions; it reported two lint errors and a missing changelog entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix reported lint findings and add the onError changelog entry","tdd_next":"Confirm existing Error-instance tests remain green in CI"}}