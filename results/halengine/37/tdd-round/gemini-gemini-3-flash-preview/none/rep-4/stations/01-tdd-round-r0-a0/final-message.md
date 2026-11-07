I have completed one red-green-refactor round for ticket #37. 

In this round, I:
1.  **Research & Strategy:** Identified the first necessary step was adding the `ajv` dependency and implementing schema compilation at registration time to fail early for invalid schemas.
2.  **Add Dependency:** Added `ajv` to `package.json` and `package-lock.json`, and bumped the package version to `0.4.0` (MINOR bump).
3.  **Red Phase:** Created `src/orchestration/tools/registry.test.ts` with a test case that ensures `ToolRegistry.register` throws an error when a tool is registered with an invalid JSON schema. This test failed as expected.
4.  **Green Phase:** Updated `src/orchestration/tools/registry.ts` to import `Ajv` and implement schema compilation within the `register` method. I also added a `WeakMap` to the registry for future caching of function-valued schemas. The test now passes.
5.  **Traceability:** Updated `specs/hal-engine-tool-input-validation/spec.md` to link the new unit test to its corresponding requirement.
6.  **Done:** Updated `.lore/dod.md` to reflect that the first facet (adding `ajv` and version bump) is complete.

I ran only the unit test I wrote (`src/orchestration/tools/registry.test.ts`) using the project's test runner, and it passed. I did not run the full suite or the acceptance tests, as per instructions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv dependency and bump version","tdd_next":"Implement caching for function-valued schemas and input validation in execute"}}