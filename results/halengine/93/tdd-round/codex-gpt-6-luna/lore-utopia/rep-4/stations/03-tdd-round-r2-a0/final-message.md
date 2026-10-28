Added a no-tool usage regression test, removed the two unused imports reported by CI, and closed the no-tool facet. The existing guard in `chatOrchestrator.test.ts` remains untouched. The focused test file passed (2 tests); the new test was green on its first run because the behavior was already implemented.

Committed and pushed `c960291`. Merging `origin/main` was unnecessary; the branch is up to date with its upstream. Red tests: 0 of mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the unchanged no-tool regression guard","tdd_next":"acceptance green"}}