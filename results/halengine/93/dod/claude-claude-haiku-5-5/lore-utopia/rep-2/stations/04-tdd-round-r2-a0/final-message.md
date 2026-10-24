Fixed both CI failures by splitting `spec.md` line 30 from one statement with two `([validated by ...])` groups into two separate statements, each with exactly one trailing parenthetical. The spec-links checker requires one link per trailing parenthetical; having two made the `#L33` link appear "outside the trailing parenthetical," which also prevented the ESLint `require-spec-link` rule from finding a spec link for the test at `orchestratorHelpers.test.ts:33`.

No regressions were introduced. The 0 tests were mine (no test file was changed); this was a spec formatting fix only.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix compound spec link on sumUsage statements","tdd_next":"acceptance green"}}