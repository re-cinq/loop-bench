Committed and pushed `b2ec15e`.

- Made the acceptance fixture timestamp deterministic, resolving CI lint.
- Added the required Unreleased changelog entry and ticked that facet.
- Formatter ran; no tests ran locally because the only relevant file is an acceptance test, which this round must not run.
- CI reported 0 red tests of mine and 0 regressions (two non-test check failures).
- Branch is synchronized with upstream; merging `origin/main` required no changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a CHANGELOG.md entry under ## [Unreleased] describing the behaviour change for existing consumers","tdd_next":"Confirm existing Error-instance tests remain green without modification"}}