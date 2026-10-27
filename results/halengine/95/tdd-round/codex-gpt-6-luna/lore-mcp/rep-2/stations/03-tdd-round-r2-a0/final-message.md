Added a plain-object rejection test confirming `onError` receives the original value as `cause`, and fixed the reported lint findings by sharing test setup and using a fixed timestamp. Updated the spec citations and DoD.

The focused test passed. I did not run lint locally. No red tests were mine; no regressions were reported. Commit `9a00404` is pushed, and the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Verify a plain object rejection is preserved as the wrapped error's cause","tdd_next":"acceptance green"}}