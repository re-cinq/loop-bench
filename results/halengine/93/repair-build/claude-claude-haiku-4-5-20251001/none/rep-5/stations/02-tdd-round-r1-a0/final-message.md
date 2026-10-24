All three facets in dod.md are already checked. The CI failure was caused by test names with embedded spec-anchor text that didn't match the names cited in spec.md. The fix removed those suffixes (lines 29, 35, 40, 45 in `orchestratorHelpers.test.ts`) so the `spec-names` check can now find all four cited test declarations.

0 regressions were caused by this round; 0 tests I wrote were red — the only change was renaming the 4 test strings to match the existing spec citations.

No unrelated smells noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix spec-names CI failure: test names now match spec.md citations","tdd_next":"acceptance green"}}