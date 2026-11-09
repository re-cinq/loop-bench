Dynamic tool definitions now validate against the schema returned for each call, with validators cached by schema object. I also changed the Ajv import and consolidated the assertion flagged by CI.

The registry test file passed locally: 3 tests passed. The new test was initially red; **one red test was mine and no regressions were identified** in the reported CI excerpt. The coverage graph tool was unavailable, so I could not verify the existing test coverage through Lore.

Committed and pushed as `29a6acf`; the branch is up to date with `origin/main` and its upstream. The Vertex SDK deprecation warning remains unrelated to this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate dynamic tool input and cache schema validators","tdd_next":"Add remaining unit tests and update tool validation documentation"}}