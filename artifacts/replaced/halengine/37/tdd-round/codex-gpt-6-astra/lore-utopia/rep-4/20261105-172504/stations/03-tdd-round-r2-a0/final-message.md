Committed and pushed `4ac29b5`; branch is current with main and upstream.

One red-green-refactor round completed: dynamic schemas now validate each call. The single new test passed after refactoring. Repaired both reported CI findings. Local red tests: 1 new, 0 observed regressions. Acceptance remains CI’s verdict.

Next: explicit WeakMap caching. No unrelated changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate calls against the current dynamic schema and repair reported CI findings","tdd_next":"Cache dynamic schema validators by object reference using WeakMap"}}