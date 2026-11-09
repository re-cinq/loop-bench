Committed and pushed `05e33c1`; branch is current with main and upstream.

Static validators are reused. CI import and assertion findings are repaired. One new test went red, then green after refactoring. Acceptance tests remain for CI.

CI’s truncated report showed one prior ticket test and at least one regression failing. Next: dynamic schema caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reuse registered static validators and repair CI findings","tdd_next":"Cache dynamic schema validators by object reference"}}