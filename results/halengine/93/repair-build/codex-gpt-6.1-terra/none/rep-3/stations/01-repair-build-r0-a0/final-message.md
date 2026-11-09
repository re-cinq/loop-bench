Fixed the four reported ESLint findings by linking the usage helper tests to the specification and combining the two assertions into one. Formatted the changed files, committed and pushed the fix, and confirmed the branch is up to date with its upstream and with `origin/main`.

The linter and build were not run locally, as instructed; CI will judge the push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added missing spec links and fixed the usage helper test's assertion count"}}