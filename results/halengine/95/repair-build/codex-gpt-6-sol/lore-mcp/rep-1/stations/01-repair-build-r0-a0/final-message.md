Replaced the test’s `new Date()` with a fixed timestamp, addressing the sole CI lint finding. Prettier passed. Commit `cb6f426` is pushed, the branch is current with `main`, and CI has not yet judged the new commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed the CI-reported nondeterministic timestamp in the onError acceptance test"}}