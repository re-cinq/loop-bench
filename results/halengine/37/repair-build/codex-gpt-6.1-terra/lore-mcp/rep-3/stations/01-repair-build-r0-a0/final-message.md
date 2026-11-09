Fixed the reported Ajv import and lint findings, committed them, and pushed the branch. The branch is up to date with `origin/main` and its upstream.

I formatted the two changed files. I did not run tests locally: the installed Ajv version is 6, while the project requires Ajv 8, so CI must verify the fix.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"CI verification pending; local dependencies contain Ajv 6 instead of required Ajv 8, so tests were not run"}}