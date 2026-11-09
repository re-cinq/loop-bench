Fixed both CI findings in the acceptance test: the prompt builder now uses its supported configuration, and the test uses one assertion while checking the original error and cleanup hook.

Formatted the changed file and pushed commit `da40c1c`. The branch is up to date with `origin/main` and its upstream. Typecheck and ESLint were not run locally, as instructed; CI will verify them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Corrected the acceptance test configuration and assertion count"}}
