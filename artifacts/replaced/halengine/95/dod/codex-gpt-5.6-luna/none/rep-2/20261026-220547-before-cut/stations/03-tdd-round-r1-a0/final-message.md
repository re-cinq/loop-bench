Pushed. All CI failures from the last round are fixed:

1. **`re-lint/max-expects` at line 311** — replaced the 3-assertion test with a single `toEqual` check on a combined object.
2. **`re-lint/require-spec-link` at lines 418, 508, 525, 609** — added `([validated by: ...])` citations to the config-hooks and tool-responses specs for the four tests that had none.
3. **`spec-names` failures** — ran `check-spec-anchor-names.mjs --fix` twice (before and after prettier) to repair all 35 stale `#Lnn` anchors shifted by the previous commit's 2-line expansion.

No regressions introduced; all 27 tests in `chatOrchestrator.test.ts` pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"eslint max-expects + require-spec-link + spec-names anchor drift","tdd_next":"acceptance green"}}