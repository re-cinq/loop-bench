The DoD already has all four facets ticked. This round fixed CI failures from the previous push (stale spec line numbers and duplicate code). No new facets were opened or closed — the work was fixing red CI checks that the previous round's push introduced.

0 tests were regressions I caused. 0 tests were mine (this round fixed spec/lint issues, not test failures).

Unrelated smells noticed but not acted on: `toolBudget.test.ts` lines 76-87 use a differently-structured logger suppression (captures warnings instead of silencing all) — not a smell, intentional. The `const quiet = () => undefined` pattern appears in multiple other test files; those were all already passing lint.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI: reanchored stale spec line numbers and broke no-duplicate-code blocks in turnUsage acceptance test","tdd_next":"acceptance green"}}