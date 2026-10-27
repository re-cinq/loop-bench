Updated the remaining documentation and examples, added the unknown-tool contract test, and fixed the reported lint and spec-link issues. The registry test file passed: **8 tests**. No acceptance tests, lint, or typecheck were run.

The test I added passed immediately, so this round had **0 red tests of my own and 0 regression tests**. The previous CI findings were lint/spec-link failures, not failing tests. Commit `6ab337e` is pushed, and the branch is even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"remaining unit tests and documentation updates","tdd_next":"acceptance green"}}