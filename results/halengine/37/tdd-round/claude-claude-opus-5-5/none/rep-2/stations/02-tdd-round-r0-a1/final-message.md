This round is committed and pushed. `ToolRegistry.register` now checks a static tool's `inputSchema` when the tool is registered, and throws an error naming the tool if the schema is invalid.

- **Red:** I added one test to `src/orchestration/tools/registry.test.ts`. It registers a tool whose schema sets `required: 'id'` (it should be a list) and expects `register` to throw an error naming `malformed_lookup`, with nothing registered. It failed because `register` didn't throw.
- **Green:** in `src/orchestration/tools/registry.ts`, `register` now compiles a static schema once and stores the result. A schema error comes back as `Invalid inputSchema for tool <name>: …`. `execute` reuses the stored check; a tool whose definition comes from a function is still checked fresh on every call. My test file passes (2/2).
- **Refactor:** none needed.
- **Traceability:** I linked the new test from the register-time statement in `specs/hal-engine-tool-input-validation/spec.md`, ticked the facet in `.lore/dod.md`, and noted what remains.

There was no round brief, so there was no CI verdict to work from. I didn't run the acceptance tests, so whether the register-time one now passes is for CI to say. Red tests: 1, the one I wrote (now green); regressions: 0 known. I couldn't ask which existing tests cover `registry.ts` because the `lore-query-trace` tool wasn't available in this session. The branch was already up to date with `origin/main` and has nothing unpushed.

The wrong-type acceptance test may already pass: ajv's message reads `/ssn must be string` and doesn't include the value. CI will confirm.

Not acted on: the existing log line `'executing'` records the input's key names, and an unknown property name could itself carry identifying data.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static inputSchema at register time, throwing an error naming the tool on an invalid schema","tdd_next":"Cache function-valued schema validators by schema object (WeakMap) and validate against the schema current at each call; add the compiled-once-across-ten-calls test"}}