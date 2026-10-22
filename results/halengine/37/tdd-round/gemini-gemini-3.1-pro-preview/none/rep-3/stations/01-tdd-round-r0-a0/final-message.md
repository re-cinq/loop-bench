I have successfully completed one red-green-refactor round.

1. **Red**: Wrote a unit test (`src/orchestration/tools/registry.test.ts`) that calls `registry.execute` with an empty object on a tool requiring a `location` property, and asserts that the returned `ToolResponse` result names the missing property and the executor is never invoked. The test failed because validation logic was absent.
2. **Green**: Added `ajv` to dependencies, bumped the minor version in `package.json`, and implemented a basic validation check in `ToolRegistry.execute` that returns a `ToolResponse` describing the missing property instead of calling the executor. The unit test passes.
3. **Refactor**: Formatted the codebase and checked off the `ajv` dependency setup facet in `.lore/dod.md`. The rest of the implementation (caching schemas, handling unexpected types) belongs to subsequent facets.

I have committed these changes and pushed them to the branch. The branch is fully merged with `origin/main` and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv to dependencies in package.json and package-lock.json and bump the package version MINOR","tdd_next":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time and cache compiled validators"}}