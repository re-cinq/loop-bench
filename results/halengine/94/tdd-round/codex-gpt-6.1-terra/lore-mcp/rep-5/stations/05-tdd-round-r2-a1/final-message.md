The ticket’s acceptance test passed in the supplied CI report, but the test job failed. The report is truncated before the actual failure message; the Vertex AI stack shown is a deprecation warning, so it does not establish what failed. Lore’s CI lookup returned “branch not found,” preventing me from retrieving the full log.

I made no changes, ran no tests, and made no commit. The report identifies zero failing tests from this branch and does not provide enough information to count regressions. No unrelated changes were made.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI failure log is truncated and Lore cannot find the branch, so the failing test and cause cannot be identified."}}