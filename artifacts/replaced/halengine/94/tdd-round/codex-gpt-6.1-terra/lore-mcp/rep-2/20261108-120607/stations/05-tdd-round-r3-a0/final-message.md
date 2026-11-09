The acceptance test passed in the reported CI run, but the test job failed. The supplied log is truncated before the failure details, and Lore could not retrieve the branch’s CI verdict. The visible Vertex stack appears under console output and does not identify the failing assertion, so I cannot determine a safe fix or the number of failing tests and regressions.

I made no changes and ran no tests locally. The unrelated Vertex SDK deprecation warning remains untouched.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI test failure details are truncated and Lore cannot retrieve the branch verdict"}}
