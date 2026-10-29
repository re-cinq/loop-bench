Fixed both reported CI findings in the acceptance test: it now uses a valid `PromptBuilder` property and checks all three outcomes in one assertion. Prettier and `git diff --check` passed. The commit is pushed, and the branch is current with `main`. CI has not yet judged the new commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed invalid PromptBuilder configuration and the acceptance test's excess assertions"}}
