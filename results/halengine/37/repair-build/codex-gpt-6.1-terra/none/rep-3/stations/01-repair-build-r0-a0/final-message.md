Fixed the reported Ajv import and lint findings, formatted the two changed files, and pushed commit `34518d9`. The branch is up to date with `origin/main` and its upstream.

CI has not yet judged the push. I did not run the tests locally because the installed Ajv is version 6, while the lockfile specifies version 8.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Fix pushed; local tests not run because installed Ajv is version 6 rather than the locked version 8, so CI must verify the build."}}