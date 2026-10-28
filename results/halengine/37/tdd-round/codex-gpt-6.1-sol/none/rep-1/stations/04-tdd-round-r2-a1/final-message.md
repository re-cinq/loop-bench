Committed and pushed `77d0210`; branch is current with main and upstream.

One new test went red → green for current dynamic-schema validation. Fixed the reported Ajv import and lint findings. CI’s truncated log showed at least two pre-existing test regressions; those await CI verification.

Next: explicit `WeakMap` validator caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate function-valued definitions against the current schema and repair CI findings","tdd_next":"Cache dynamic schema validators by object reference using WeakMap"}}