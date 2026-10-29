Committed and pushed one round (`5142080`). The new registry test confirms that valid input with an undeclared property reaches the executor unchanged. I fixed CI’s Ajv type import finding, updated the spec links, and marked this facet complete. The registry test file passes; CI has not yet judged the push. One red test was mine during the round and was fixed; there were zero regressions.

Next facet: the remaining unit tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pass valid input containing an undeclared extra property through unchanged, with a focused registry test and spec link; repair the Ajv type import reported by CI","tdd_next":"Add remaining unit tests, spec links, and documentation updates"}}