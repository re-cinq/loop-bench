Closed the nested required-property path facet: rejection messages now include the full JSON Pointer, and the focused test covers it. The unit test also checks the wrong-type field path without echoing its value; CI’s unused import and missing citation findings are addressed.

The `registry.test.ts` file passed (3 tests). No acceptance tests, lint, or typecheck were run. There were 0 red regressions; the new nested-path test was the round’s red test.

Committed and pushed as `37265ec`; the branch is synced with its upstream, and `main` was already up to date. The broader documentation and remaining unit-test work is still open.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Include the full JSON Pointer parent path in nested required-property rejection messages","tdd_next":"Remaining unit tests and validation documentation updates"}}