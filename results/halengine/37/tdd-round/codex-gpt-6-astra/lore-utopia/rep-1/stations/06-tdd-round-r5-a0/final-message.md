Committed and pushed `fe6158b`: static validator reuse and Ajv import repair.

One new test went red → green and passed after formatting. CI’s truncated report identified two existing regression suites; CI must confirm their recovery. Branch is clean and current with main.

Next: dynamic-schema caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Retain static validators and repair Ajv module resolution","tdd_next":"Cache dynamic schema validators by object reference"}}