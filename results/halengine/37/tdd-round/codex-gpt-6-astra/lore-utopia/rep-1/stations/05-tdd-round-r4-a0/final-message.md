Committed and pushed `d95f663`. Required-field rejection test went red → green and passed after formatting. Fixed Ajv import resolution; CI must confirm the repair.

One new red test; two named regressions in the truncated CI brief. Acceptance tests were not run. Branch is current with main and fully pushed.

Next: validator caching. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input before execution and repair Ajv module resolution","tdd_next":"Retain static validators and cache dynamic schemas by object reference"}}