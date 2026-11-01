Committed and pushed `6715f84`; branch is current with main and upstream.

Fixed Ajv loading. One focused test passes, but also passed before the fix; no local red was reproduced. CI’s truncated report identifies at least one regression suite (`config.test.ts`); zero new tests were red locally. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv named-export loading failure","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}