Implemented and pushed one TDD round:

- Added a focused missing-required-property test.
- Added Ajv runtime validation before executor invocation.
- Added Ajv to production dependencies.
- Linked the test to its spec statement.
- Updated `.lore/dod.md`.
- Test result: 1 passed.
- Red tests: 1 ours, 0 regressions.
- Commit: `5a8e8fa`
- Branch is synchronized and fully pushed.
- Unrelated: npm reported 14 dependency vulnerabilities; unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject missing required tool input without invoking the executor","tdd_next":"compile static schemas at register time and cache dynamic schemas by object reference"}}