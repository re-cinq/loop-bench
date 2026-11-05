Pushed `8204996`: repaired the Ajv import and CI-reported assertion lint issue. Formatted changes; branch is clean and current with main.

Focused test: 1 passed. It also passed before the fix, so no local RED was established. CI’s truncated report names 2 regressions; 0 new tests failed locally.

Next: dynamic schema caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv constructor and assertion lint failures","tdd_next":"Resolve dynamic tool schemas per call and cache validators by schema object"}}