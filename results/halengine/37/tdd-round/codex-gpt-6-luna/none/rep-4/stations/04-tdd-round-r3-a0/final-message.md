Added a required-field rejection test, linked it to the spec, updated the checklist, and fixed the reported Ajv typing error. The test passed; it first failed because Jest wasn’t available as a global, so I replaced the mock with a call counter.

CI also reported a provider test failure, but its log excerpt omits the error details. I did not change that existing test. **Red tests: 1 of mine (the initial test setup failure); 1 reported provider failure remains unresolved.** The branch is pushed and up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Required-field rejection unit test","tdd_next":"Complete remaining unit tests and documentation updates"}}