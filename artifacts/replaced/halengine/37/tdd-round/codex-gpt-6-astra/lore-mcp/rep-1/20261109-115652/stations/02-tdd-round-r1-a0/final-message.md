Committed and pushed `e56c91b`. Static tools now reject invalid input before execution. Fixed the reported Ajv import and lint findings.

One round: 1 new red test, 0 observed regressions; final targeted run passed both tests. Acceptance tests remain for CI. Branch is synchronized with `main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate static tool input before execution","tdd_next":"Resolve and cache dynamic schema validators by object reference"}}