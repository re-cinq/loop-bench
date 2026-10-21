Added a focused test confirming wrong-type rejection names `/identifier`, linked it to the spec, and updated the DoD. The test passed locally; the requested `timeout` command was unavailable, so I used Jest’s 300-second test timeout. The working tree is clean, commit `445a6e3` is pushed, and the branch is up to date with `main`.

The CI brief still reports one failing acceptance test from the prior push; the same field-path behavior passed in the test I ran locally. No unrelated smells were acted on. Red tests: 0 written this round, 1 previously reported CI failure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrong-type rejection names the failing field path","tdd_next":"Add registry and orchestrator unit coverage for remaining input-validation facets"}}