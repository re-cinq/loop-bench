Fixed the reported ESLint findings in `orchestratorHelpers.test.ts`: added spec links to the usage tests and combined the two assertions into one. Formatted the file, committed as `945cab2`, and pushed it. The merge from `origin/main` was already up to date, and the branch is not ahead of its upstream.

I did not rerun ESLint in this pod. The CI verdict identified the findings, but a passing build has not yet been confirmed.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Fixed all four reported eslint findings and pushed 945cab2; CI has not yet judged the new head."}}