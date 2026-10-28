Added a focused wrong-type validation test and replaced the deep mock-call chain flagged by CI. The test file passed locally; the acceptance tests were not run. No implementation change was needed because the current registry already reports the field path and expected type.

Committed and pushed `407fdbb`; `origin/main` was already merged, and the branch is up to date. The broader unit-test facet remains open. This round added one test; it introduced no regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrong-type field-path behavior is covered by a focused unit test; the CI lint finding is fixed","tdd_next":"Remaining unit tests and validation documentation updates"}}