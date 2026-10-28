Completed one red-green-refactor round for required-property rejection. The test failed before the change and passed after the refactor. I added Ajv validation, bumped the package to `0.4.0`, and updated the spec link and checklist. The focused test passed; no other tests or checks were run.

Committed and pushed as `cb4d511`. The branch is even with its upstream, and `origin/main` merged cleanly. Lore had no CI verdict for this branch (404).

There is 1 red test from this round and 0 known regressions. Remaining facets include broader validation coverage and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject missing required properties with a ToolResponse and add Ajv as a runtime dependency with a minor version bump","tdd_next":"broader validation coverage and contract documentation"}}