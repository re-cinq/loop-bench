**Round delivered:** static schema compilation errors now preserve Ajv’s original error as `cause`. Fixed the three lint findings reported by CI and updated the DoD facet. Commit `8679be2` is pushed, and the branch is up to date with `origin/main`.

The registry test file passed: 3 tests. Red tests this round: 1 (mine); regressions: 0. The remaining unchecked facets are next.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Static schema compilation at registration and validator caching","tdd_next":"Validate rejected inputs without leaking values and cover recovery, documentation, and remaining registry behaviors"}}