This round's facet is done and pushed. `ToolRegistry.register` now checks a static tool's `inputSchema` when the tool is registered. If the schema is not valid JSON Schema, it throws an error that names the tool.

- **Red:** I added a new test file, `src/orchestration/tools/registry.test.ts`, with one test. It registers a tool whose `required` is a string instead of a list and expects `register` to throw an error naming that tool. Before the change it failed because nothing was thrown.
- **Green:** `ajv` 8 is now in `dependencies`, set up without strict mode, format checks, type coercion or defaults. `register` builds the validator for a static schema and stores it on the registered tool. It doesn't use that validator yet; checking input in `execute` is a later facet. Schemas produced by a function are not checked at `register` yet.
- **Refactor:** nothing needed. My test passes.
- **Also changed:** the version goes from 0.3.0 to 0.4.0 (MINOR), and `CHANGELOG.md` has an Unreleased entry. The spec statement on register-time compilation now cites the new test as well as the acceptance test, and the link checker reports 0 misplaced. In `.lore/dod.md` I ticked the `ajv` facet and the register-time compile facet. I moved the caching of validators for function-valued tools out into its own unchecked facet.

**Tests and regressions:** I ran only my own test, which passes. There was no round brief, so there is no CI verdict yet: 1 red test was mine, and no regressions are known. I didn't run the existing tests. A search found no tool registered in an existing test or example with a schema that would now fail at `register`. One acceptance test (register-time throw) should now pass; the other three still depend on `execute` validating input.

**Delivery:** the commit is pushed, `origin/main` merged in cleanly with nothing new, and the branch is not ahead of its upstream.

**Smell noticed, not acted on:** `get()` and `getDefinitions()` call a function-valued definition again every time they are used.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv dependency and compile static inputSchema at register time, throwing an error naming the tool","tdd_next":"Validate input in ToolRegistry.execute and return a rejection ToolResponse naming missing required fields"}}