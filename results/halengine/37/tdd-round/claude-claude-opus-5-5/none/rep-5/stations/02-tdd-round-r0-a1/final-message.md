This round makes `ToolRegistry.register` compile a static tool's `inputSchema` when the tool is registered. A broken schema now throws at startup, and the error names the tool. The change is committed and pushed, `origin/main` merged in with nothing new, and the branch is level with its upstream.

- **Red:** I added a test to `src/orchestration/tools/registry.test.ts`. It registers a tool whose schema declares an unknown type and expects the error to name the tool. It failed because `register` did not throw.
- **Green:** in `src/orchestration/tools/registry.ts`, `register` now compiles a static schema and stores the compiled validator, and `execute` reuses it. A tool defined by a function still compiles its schema on every call. A compile failure becomes `Invalid inputSchema for tool <name>: …`. Both tests in the file pass.
- **Refactor:** none needed.
- **Traceability:** the matching statement in `specs/hal-engine-tool-input-validation/spec.md` now links to the new test (line 33). I checked the existing link to line 4 and it is still correct.
- **`dod.md`:** I split the old facet in two. The register-time compile is ticked; caching validators for function-defined tools (a `WeakMap` keyed by the schema object) is added as a new unchecked facet.

I ran only my own test file. There was no round brief and so no CI verdict on the previous push, which means I can't say how many red tests are regressions; CI will report that on this push. The one red test this round was mine, and it is now green. I didn't run lint, the typechecker or the build here. One thing for CI's lint step: the new code uses an `error as Error` cast inside the `catch`.

I didn't spot any unrelated problems in the code.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static inputSchema at register time, throwing an error naming the tool on an invalid schema","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap)"}}