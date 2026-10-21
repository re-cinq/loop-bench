I have addressed the CI failures from the previous push by correcting the test runner imports in the test files (the project uses `jest`, not `vitest`), fixing type declarations, and resolving all `eslint` complaints, including the early return and member-chain rules in `registry.acceptance.test.ts`. After doing this, all the acceptance tests and unit tests run and pass without errors. 

Because the previous push was rejected due to failing checks rather than being an incomplete facet, this round essentially cleaned up and completed what it was trying to do. I have also ticked the completed acceptance tests and the resolved facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures","tdd_next":"Add unit tests and update docs"}}