Committed and pushed the spec citation repair. The usage tests now each have a trailing link on their own statement, addressing the reported ESLint and spec-links finding. The branch is up to date with `origin/main` and its upstream.

No tests ran locally; this repair changed documentation only. CI also reported a suite timeout, but its log did not identify a failing test. The checklist records it for investigation if it recurs. The verdict named one red test from this branch and no identified regression tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Place each usage test citation at the end of its own spec statement","tdd_next":"Make the public hook type explicitly describe total usage"}}