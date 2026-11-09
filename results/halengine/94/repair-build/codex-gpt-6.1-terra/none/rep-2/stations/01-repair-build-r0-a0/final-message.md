Fixed both CI findings in the acceptance test and pushed commit `eef8dd4`. The test now uses valid prompt configuration fields and checks the rejection and hook outcomes in one assertion.

Formatted the changed file and confirmed the branch is up to date with `origin/main` and its upstream. Typecheck and lint were left to CI as requested; the build has not been verified locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Corrected the acceptance test's prompt configuration and consolidated its assertions."}}