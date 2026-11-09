Committed and pushed `6d74ebb`. Required-property errors now escape `/` and `~` in JSON Pointer paths. The new focused test failed before the fix and passed afterward.

The lockfile now supports a clean `npm ci` locally. CI must confirm whether that resolves its reported Ajv module errors; the remaining unit tests and documentation are still open.

This round had **one red test of mine**. The previous CI verdict named two regression test suites that could not load; their individual test counts are unknown. The branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Escape required property names in JSON pointer paths and repair the clean-install lockfile","tdd_next":"Confirm CI resolves Ajv, then add remaining unit tests and documentation"}}