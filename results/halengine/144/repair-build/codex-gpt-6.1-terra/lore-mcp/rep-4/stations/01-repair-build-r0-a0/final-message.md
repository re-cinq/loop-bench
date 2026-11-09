Pushed commit `c649688` with the list-request handler and fixes for the reported lint findings. The acceptance test now expects `UNSUPPORTED` when the store cannot list, as the ticket requires.

The three affected test suites passed locally: 32 tests. Formatting passed; lint, typechecking, and the full build were left to CI as instructed. The branch is up to date with its upstream and `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Implemented session list responses and addressed the reported test and lint findings; CI will verify the push."}}