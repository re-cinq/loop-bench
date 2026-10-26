Documented `list_sessions` and `session_list` in both specs, fixed the reported ESLint findings, and checked the DoD facet. The commit was pushed as `4b3c0e5`; the branch is clean and up to date with its upstream, and `origin/main` was already merged.

No tests were run: the remaining facet was documentation, and a test asserting documentation text would violate the repository rule. The trace command was unavailable in the pod. Red tests: 0 ours, 0 regressions; the previous CI report named lint errors only.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in both specs","tdd_next":"acceptance green"}}