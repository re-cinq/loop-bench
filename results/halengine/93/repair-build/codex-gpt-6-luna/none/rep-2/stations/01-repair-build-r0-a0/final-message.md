I fixed the reported lint findings: the usage helper tests now link to their spec statements, and the test with two assertions uses one comparison. I formatted the changed files and pushed commit `db83d98`. The branch is up to date with its upstream, and `origin/main` was already merged.

I did not rerun ESLint in this pod, so CI still needs to confirm the fix.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Fixed the reported lint findings and pushed db83d98; ESLint was not rerun in this pod, so the build remains unverified by CI."}}