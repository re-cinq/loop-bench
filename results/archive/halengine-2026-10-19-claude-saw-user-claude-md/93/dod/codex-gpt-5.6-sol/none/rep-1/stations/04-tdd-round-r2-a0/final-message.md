Branch is current. The fix was one change: the two bullet points in `specs/hal-engine-config-hooks/spec.md` each had multiple `([validated by](...))` trailing parentheticals — the spec-link parser only indexes the last one per statement, so all the earlier links were reported as "misplaced" and excluded from the index, which caused the ESLint `require-spec-link` rule to flag those tests as unlinked. Combining all links per statement into a single `([link1](…), [link2](…), …)` group fixes both the spec-links and ESLint failures.

0 tests written by me this round; 0 regressions caused.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the full build, test, typecheck, ESLint, and Prettier CI checks pass","tdd_next":"acceptance green"}}