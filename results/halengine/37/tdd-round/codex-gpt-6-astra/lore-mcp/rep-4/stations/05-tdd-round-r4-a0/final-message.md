Committed and pushed `0cb85ef`. Fixed both CI-reported Ajv accesses.

One new test went red → green and passed after refactoring against Ajv 6 and 8. Known main regressions: 0. Acceptance tests remain CI’s responsibility.

Branch is current with main and fully pushed. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv constructor and static-test default export accesses","tdd_next":"Cache dynamic schema validators by object reference"}}