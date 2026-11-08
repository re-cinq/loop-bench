I have completed the first TDD round for ticket #37, focusing on the registration-time schema compilation facet.

### Research & Strategy
- Analyzed `ToolRegistry.register` and identified that it was not validating or compiling the `inputSchema` of registered tools.
- Established a baseline by running a new unit test that failed when an invalid schema did not cause a throw at registration time.
- Decided to add `ajv` for JSON Schema validation as required by the ticket.

### Execution
- **Dependency Management:** Added `ajv` to `dependencies` and bumped the package version to `0.4.0` (MINOR).
- **Implementation:** Updated `ToolRegistry.register` to compile static tool schemas using `Ajv`. It now throws a descriptive error naming the tool if compilation fails.
- **Caching:** Added a `WeakMap` to store compiled validators for future use (to be fully utilized in the next facet).
- **Test:** Created `src/orchestration/tools/registry.test.ts` with a unit test verifying that invalid schemas are rejected at registration time.
- **Traceability:** Linked the new test to the corresponding statement in `specs/hal-engine-tool-input-validation/spec.md`.
- **Documentation:** Added an entry to `CHANGELOG.md` and updated `.lore/dod.md` to reflect the completed facets.

### Validation
- Ran the new unit test `src/orchestration/tools/registry.test.ts` and confirmed it passes (green).
- Formatted changed files with `prettier`.
- Merged `origin/main` into the current branch to ensure consistency.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"static schema compilation at registration time","tdd_next":"input validation in ToolRegistry.execute"}}