Committed and pushed `b5d284c`; branch is clean and current with main.

One new test went red → green for static-validator reuse. Refactor review required no further changes. Repaired the Ajv import implicated in CI’s two ticket-suite failures and one regression suite failure. Acceptance checks remain CI’s responsibility.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reuse the registered static validator and repair Ajv import resolution","tdd_next":"Cache dynamic schema validators by object reference"}}