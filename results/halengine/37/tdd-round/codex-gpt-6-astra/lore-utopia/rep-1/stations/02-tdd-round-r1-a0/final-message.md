Committed and pushed `6ce0b9b`. Fixed Ajv ESM loading and both fixture lint findings. Main is merged; working tree is clean.

Focused test: 1 passed, including before the fix locally. CI reported 2 regression suites and 1 acceptance suite failing to load; no new test failed locally. CI verification remains pending.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv ESM loading and acceptance fixture lint findings","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}