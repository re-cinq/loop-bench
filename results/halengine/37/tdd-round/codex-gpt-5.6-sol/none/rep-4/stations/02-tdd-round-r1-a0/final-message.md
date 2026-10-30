Implemented and pushed commit `6075293`:

- Static schemas compile during registration with tool-named errors.
- Dynamic schemas cache validators by object reference.
- Added one focused test; red then green.
- Fixed Ajv type compatibility and existing unit-test lint issue.
- Formatter passed; branch is synchronized with upstream.
- Red tests: 1 ours, 0 regressions.
- Acceptance tests were not run or modified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static schemas at registration and cache function-sourced schemas","tdd_next":"add ajv dependency/version bump facet"}}