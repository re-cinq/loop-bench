Committed and pushed `f26bf52`. Fixed Ajv constructor compatibility in one red-green-refactor round.

The new test failed as expected, then passed against Ajv 6 and 8. One new red test; no identified main regressions. CI checks remain pending.

Branch is current with main; working tree is clean. Next: dynamic schema caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported callable CommonJS Ajv constructor compatibility","tdd_next":"Cache dynamic schema validators by object reference"}}