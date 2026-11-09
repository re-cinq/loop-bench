Pushed `7eecd22`: repaired reported Ajv import and lint findings. Branch is current with main and upstream.

New test: 1 passed; it also passed before repair, so no local red was reproduced. Local red tests: 0 mine, 0 observed regressions. CI remains the judge.

Next: dynamic-schema caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv imports and mock member chains","tdd_next":"Cache dynamic schema validators by object reference"}}