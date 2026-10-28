Committed and pushed `97284c6`; merged base is current and the branch has no unpushed commits.

One new test went red, then green, and passed after formatting. CI identified two prior branch tests as failing; the coverage graph identified no main-branch regressions. CI will verify the repairs.

Next: dynamic-schema validator caching. No unrelated smells changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair Ajv constructor and error-path incompatibilities; name failed type constraints without leaking values","tdd_next":"Cache dynamic schema validators by object reference"}}