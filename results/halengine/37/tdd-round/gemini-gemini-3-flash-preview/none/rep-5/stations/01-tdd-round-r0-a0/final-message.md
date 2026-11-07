I have completed one red-green-refactor round for ticket #37.

### Research & Strategy
I identified the first necessary steps: adding the `ajv` validator dependency, bumping the package version to `0.4.0` (MINOR), and implementing registration-time schema compilation for static tool definitions. I decided to target the facet of throwing an error at registration time for invalid schemas, as it provides an immediate failure for misconfigured tools.

### Execution
1.  **Red Phase**: I created a new unit test file `src/orchestration/tools/registry.test.ts` with a test case that expects `ToolRegistry.register` to throw an error when a static tool is registered with an invalid JSON Schema. I confirmed this test failed.
2.  **Green Phase**:
    *   I installed `ajv` as a dependency and updated `package.json` and `package-lock.json`.
    *   I bumped the version of `@re-cinq/hal-engine` from `0.3.0` to `0.4.0`.
    *   I modified `src/orchestration/tools/registry.ts` to import `Ajv`, configure it (with `strict: false` and `validateFormats: false`), and use it in `register` to compile the `inputSchema` for static definitions.
    *   I verified that the unit test now passes.
3.  **Refactor Phase**: I ensured the code followed project conventions and was properly formatted. I also updated `specs/hal-engine-tool-input-validation/spec.md` with a traceability link to the new unit test and ticked off the first facet in `.lore/dod.md`.

### Final State
The repository now has `ajv` integrated, and static tools are validated upon registration. The `WeakMap` for caching function-valued tool schemas has been initialized in preparation for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"throws at register time naming the tool when a static inputSchema cannot be compiled","tdd_next":"validate input in ToolRegistry.execute before invoking the executor"}}