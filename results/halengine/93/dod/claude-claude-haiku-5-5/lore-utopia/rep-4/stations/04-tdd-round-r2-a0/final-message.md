All facets are already ticked. The fix was purely CI repair — two spec statements had their validated-by links in separate `([...])` blocks rather than a comma-separated list inside one trailing parenthetical. Combining them into one fixes both the `spec-links` gate and the `require-spec-link` ESLint rule that refused to count misplaced citations.

0 regressions caused; 0 tests were mine (this was a CI-repair round with no new test written — the mechanical change was two lines of spec prose).

Unrelated smell noticed but not touched: the `orchestratorHelpers.test.ts` `shouldContinueToolLoop` tests (lines 11–26) have no spec links either, but they were not in the CI failure list and are out of scope for this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix misplaced spec-link citations (eslint + spec-links CI gates)","tdd_next":"acceptance green"}}