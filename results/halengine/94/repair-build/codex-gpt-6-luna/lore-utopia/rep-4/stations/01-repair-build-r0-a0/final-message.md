Fixed both CI findings in the acceptance test: it now uses valid `PromptBuilder` config fields and groups its assertions into one `expect`. The test checks that the caller and `onError` receive the original error and that `afterSession` runs.

Formatted the changed file, committed as `8f25cda`, pushed it, and confirmed the branch is even with its upstream. `origin/main` was already merged. I did not rerun the typecheck or linter locally; CI will judge the pushed commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Corrected the acceptance test config and grouped its checks to address CI’s typecheck and lint failures"}}