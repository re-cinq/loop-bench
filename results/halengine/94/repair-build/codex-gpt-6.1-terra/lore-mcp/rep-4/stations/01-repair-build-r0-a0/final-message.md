Fixed both CI findings in the acceptance test and pushed commit `02ac117`. The test uses valid prompt configuration fields and combines its checks into one assertion while preserving error identity checks.

Formatted the changed file. Typecheck and lint were left to CI as requested; no local build was run. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Corrected invalid prompt configuration and consolidated acceptance test assertions"}}
