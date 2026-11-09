Committed and pushed `756155b`; branch is current with main and upstream.

One red-green-refactor round completed: static validators are reused across ten calls. The new test passed after refactoring. Repaired all named CI findings; CI will verify them.

Red tests: one new this round; zero identified regressions. Next: dynamic schema caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reuse static schema validators across executions and repair named CI findings","tdd_next":"Cache dynamic schema validators by schema object reference"}}