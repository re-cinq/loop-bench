Committed and pushed `1f51731`; branch is current with main and upstream.

Repaired the Ajv import and static-test assertion count. The new passthrough test passes, but did not reproduce CI’s red import failure locally. CI reported three ticket-owned failing suites and no identified pre-existing regressions.

Next: dynamic schema caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI-reported Ajv import and static-test assertions","tdd_next":"Cache dynamic schema validators by object reference"}}