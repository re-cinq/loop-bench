Added a linked test for unchanged pass-through of extra properties and corrected the reported Ajv typing and early-return issues. The branch is committed and pushed as `c3620f8`, and is up to date with `origin/main`.

The test passed on its first run, so this round did **not** demonstrate a red phase. No test was observed red from CI this round; the prior CI verdict reported typecheck, lint, and spec-name failures, not test failures. I did not rerun CI checks locally. The prior lint report also flagged duplicated test code; that finding remains for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Extra-property input pass-through test","tdd_next":"Remaining unit and orchestrator tests, documentation updates, and outstanding CI lint findings"}}