Fixed CI’s nondeterministic-test lint error by replacing `new Date()` with a fixed timestamp. Formatted the file, committed, pushed, merged current `main`, and confirmed the branch matches upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Acceptance test used a live timestamp, triggering the nondeterministic-test lint rule"}}
