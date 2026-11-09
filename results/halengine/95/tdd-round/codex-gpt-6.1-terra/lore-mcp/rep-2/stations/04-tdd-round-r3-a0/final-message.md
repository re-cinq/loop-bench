Shared the test descriptor fixture setup to address all four CI duplicate-code findings, and updated the spec links. Commit `5a39654` is pushed; the branch is up to date with its upstream and `origin/main`.

No tests ran locally because this round repaired the CI lint findings without writing a new test. The reported CI verdict named **0 red tests**: 0 newly written and 0 regressions. CI still needs to verify the repair and the existing Error-instance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Remove duplicated test fixture setup reported by CI","tdd_next":"Confirm existing Error-instance tests remain green through CI"}}