Fixed both CI findings in the acceptance test and pushed commit `f1d00bd`. The test now uses the supported prompt configuration and checks the rejection and hook behavior with one assertion.

The changed file was formatted. Typecheck and lint were left to CI as requested; their results are not yet available. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed invalid prompt configuration and excess assertions in the beforeSession acceptance test; CI verification pending."}}