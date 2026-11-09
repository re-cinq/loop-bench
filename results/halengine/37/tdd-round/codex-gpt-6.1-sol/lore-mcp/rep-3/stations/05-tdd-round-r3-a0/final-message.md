Committed and pushed `e836544`, fixing CI’s Ajv import compatibility failure. Branch is current with `main`; working tree is clean.

One new test passes. Local red: 0; prior CI named three failing existing test files. The import failure did not reproduce locally. No unrelated changes.

Next: dynamic schema caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv import compatibility","tdd_next":"Cache dynamic schema validators by object reference"}}