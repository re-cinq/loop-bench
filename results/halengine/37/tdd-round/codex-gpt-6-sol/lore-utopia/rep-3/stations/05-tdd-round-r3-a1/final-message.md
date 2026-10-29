Committed and pushed `490366b`. This round fixed the prior CI assertion-count finding and made static tools retain their registration-time validator. The new test failed before the change and passed after the refactor. One red test was mine; no regressions were identified. Acceptance tests were left to CI.

Next facet: the remaining unit tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Keep a static tool's registration-time validator when its definition object later changes","tdd_next":"remaining unit tests and documentation updates"}}