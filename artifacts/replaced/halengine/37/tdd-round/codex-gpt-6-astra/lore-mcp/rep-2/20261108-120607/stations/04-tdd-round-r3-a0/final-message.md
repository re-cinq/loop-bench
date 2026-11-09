Pushed `df69c20`, repairing Ajv’s import. Branch is clean and synchronized with main and upstream.

Focused test: 1 passed. It also passed before the repair, so no local RED was reproduced. New red tests: 0; confirmed main regressions: 0. CI reported three branch suite-loading failures and must verify the fix.

Next: validator caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv named-import failure","tdd_next":"Reuse static validators and cache dynamic schemas"}}