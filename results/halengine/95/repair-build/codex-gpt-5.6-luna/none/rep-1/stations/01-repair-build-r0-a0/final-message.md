Fixed the nondeterministic timestamp in the acceptance test, formatted it, committed, pushed, and confirmed the branch is up to date with origin. CI lint was not run locally per instructions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Replaced new Date() in the acceptance fixture with a fixed timestamp to resolve eslint nondeterministic-test failure"}}