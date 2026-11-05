Pushed `8c8faa5`; branch is current with main and upstream.

Dynamic schemas now validate per call and cache by object. Repaired Ajv import and duplicate test setup. One new test went red → green and passed after refactoring.

CI’s truncated excerpt identifies one ticket test suite and one existing regression. Full CI remains authoritative. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate dynamic schemas per call with object-reference caching; repair reported CI findings","tdd_next":"Ensure rejection diagnostics name constraints and paths without leaking values"}}