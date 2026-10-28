Committed and pushed `fbdb923`, repairing both CI-reported Ajv typing errors. Main is merged; the branch is clean and synchronized.

The exploratory test passed immediately and was removed, so no red-green-refactor cycle was established. Red tests: 0 mine, 0 reported regressions; CI reported two type errors. CI verification remains pending.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv namespace and constructor-option typing","tdd_next":"Remaining contract coverage and documentation"}}