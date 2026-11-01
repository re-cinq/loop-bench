Committed and pushed `da02fc4`: repaired the Ajv import and duplicated fixture setup. Branch is current with main and upstream.

The one new test passes, but also passed before the fix; local RED was not achieved. CI listed two branch-added failing tests; no confirmed pre-existing regressions. Acceptance remains for CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI Ajv constructor and duplicated fixture findings","tdd_next":"Cache dynamic schema validators by object reference"}}