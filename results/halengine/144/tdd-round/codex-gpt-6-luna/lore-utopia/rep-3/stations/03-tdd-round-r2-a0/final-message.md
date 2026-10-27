Documented `list_sessions` and `session_list` in both specs, fixed the reported acceptance-test lint issues, updated the citations, and checked off the completed facet in `.lore/dod.md`.

Formatted the changed TypeScript file. Ran no tests: this documentation facet added no test, and the acceptance tests are reserved for CI. Red tests: **0 ours, 0 regressions**; the prior CI findings were lint and spec-name errors.

Committed and pushed as `7c24d6a`. Merging `origin/main` found no changes, and the branch is even with its upstream. The Lore API could not resolve this branch, so I used the supplied round brief for the prior CI verdict.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in both specs","tdd_next":"acceptance green"}}