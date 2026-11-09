Committed and pushed `94821ad`, repairing Ajv imports. Branch matches upstream and includes main.

One test passes, but it also passed before the repair; local RED was not reproduced. CI listed five failing suites: one acceptance suite and four prior-round regressions. No unrelated changes made.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv subpath import failure","tdd_next":"Cache dynamic schema validators by schema object reference"}}