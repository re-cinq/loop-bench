Fixed the Ajv import, the reported lint findings, and the validation failures exposed once the tests could start. Commit `c9cecbd` is pushed, merged with the current `origin/main`, and the branch is up to date with its upstream.

The two targeted registry suites passed: 5 tests. The full build and typecheck were not run locally, as instructed; CI must verify them.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Targeted registry tests passed; full build and typecheck await CI on the pushed commit"}}