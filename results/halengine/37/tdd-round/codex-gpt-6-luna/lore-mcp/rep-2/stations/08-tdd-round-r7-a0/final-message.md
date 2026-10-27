Committed and pushed `efdee03` (`test tool input rejection redaction`). The branch is clean and up to date with `origin/loop-bench/37`; `origin/main` was already merged.

The registry test file passed: 7 tests. The new redaction test passed on its first run because the implementation already had that behavior, so this round did not observe a failing test. The initial Jest invocation could not load the ESM test; the repository’s configured ESM invocation passed. I did not run acceptance tests, lint, or typecheck.

Red tests: **0 ours, 0 regressions**. The next facet is the remaining unit tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pin that rejected property values are absent from returned text and emitted log lines","tdd_next":"remaining unit tests and documentation updates"}}