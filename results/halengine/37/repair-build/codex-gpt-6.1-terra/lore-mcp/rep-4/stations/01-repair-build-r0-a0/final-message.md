Pushed the fixes to the branch and confirmed it is up to date with `origin/main` and its upstream.

The Ajv loading error and reported lint findings are addressed. The full test run then exposed missing input validation; after adding it, the two registry test suites passed locally: **5 tests passed**. The full suite was not rerun after that change, and CI has not yet judged the pushed commits.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Full test run exposed missing validation; targeted registry tests now pass, but the full suite and CI have not been rerun on the final commit."}}