I have successfully resolved the CI failures.

I deduplicated the test setup code using `cleanupEngines`, fixed linting errors like nested ifs, flag params, and early returns, implemented the `list_sessions` logic in `messageHandler.ts` handling `StoreCannotList` and `history: {enabled: true}` configuration, aligned the acceptance tests with the spec criteria (which expects `UNSUPPORTED` for an unconfigurable/throwing store for `list_sessions`), and updated the markdown spec links and text accordingly.

The changes have been pushed and the branch is fully up-to-date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Resolved eslint and test failures, implemented list_sessions handling and updated tests to match specifications"}}