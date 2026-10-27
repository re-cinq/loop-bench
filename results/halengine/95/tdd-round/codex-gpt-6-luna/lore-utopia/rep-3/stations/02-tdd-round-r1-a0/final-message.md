Added the Error identity assertion, Unreleased changelog note, and updated the DoD and spec link. The focused test passed; the existing Error tests were left unedited. No red tests were observed here, and I ran no acceptance tests.

Committed and pushed `144c1f7`; the branch is even with its upstream and up to date with `origin/main`. The round brief’s CI failure details were truncated, and Lore returned 404 for the branch, so I couldn’t inspect the full prior lint findings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Confirm Error-instance passthrough and add the Unreleased changelog entry","tdd_next":"acceptance green"}}