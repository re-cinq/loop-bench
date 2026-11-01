Committed and pushed `12860a2`. One new test went red → green; no regression-test failures were reported. Repaired all listed CI findings. Main is merged, and the working tree is clean.

CI still owns acceptance verification. Unrelated unsafe string conversion in session-save logging remains untouched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve notification and cause when rejection string conversion throws","tdd_next":"Confirm existing Error-instance and acceptance tests pass in CI"}}