Committed and pushed `5578d99`. The round repaired the Ajv import and reported lint issue, and added a test for the unknown-tool exception. The branch is up to date with its upstream and `origin/main`.

The new test passed both before and after the repair: **0 red tests were mine**. CI reported suite-loading failures affecting pre-existing tests, but the truncated verdict does not establish a regression-test count. CI must confirm the import, typecheck, and coverage repairs. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair reported Ajv import, type and lint failures and pin the unknown-tool exception","tdd_next":"Confirm CI coverage after the Ajv import repair and address remaining unit tests and documentation"}}