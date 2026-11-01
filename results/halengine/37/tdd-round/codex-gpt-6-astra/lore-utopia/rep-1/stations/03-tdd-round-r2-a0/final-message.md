Committed and pushed `2b131fb`. Branch is clean and current with `main`.

Fixed Ajv constructor access. The one new test passes, but also passed before the fix; local RED was not reproduced. CI’s excerpt named two regressions and zero tests from this round; its truncated total is unknown.

Next: validator caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv constructor and type errors","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}