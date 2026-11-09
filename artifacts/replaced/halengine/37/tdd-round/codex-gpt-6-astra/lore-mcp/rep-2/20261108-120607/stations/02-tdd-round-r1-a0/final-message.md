Pushed `30b1ac5`: repaired the Ajv import and both CI lint findings. Branch is current with main and upstream.

New test: 1 passed; it also passed before the repair, so local RED was not reproduced. No regressions confirmed; CI’s failure log was truncated. Acceptance tests remain for CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv ESM import and CI lint findings","tdd_next":"Reuse static validators and cache dynamic schemas"}}