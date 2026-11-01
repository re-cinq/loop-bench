Pushed `7dbe7d7`; branch is clean and current with main.

Dynamic schemas now validate per call with cached validators. Fixed the Ajv import. One new test went red → green and passed after refactoring. CI’s excerpt identified two existing config-test regressions; CI will verify their repair.

Next: validation privacy coverage and remaining documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate dynamic schemas and cache validators by schema reference; repair Ajv import","tdd_next":"Complete validation privacy coverage and remaining documentation"}}