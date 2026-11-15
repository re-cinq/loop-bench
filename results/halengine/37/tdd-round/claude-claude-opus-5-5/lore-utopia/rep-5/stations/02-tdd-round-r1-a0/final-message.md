This round validates tool input in `ToolRegistry.execute` and fixes every failure CI reported on the last push. It's committed and pushed, and the branch is level with `origin/loop-bench/37` and `main`.

**Red → green:** I added a unit test to `src/orchestration/tools/registry.test.ts` (line 19). It calls `execute` without a required property and expects a rejection that names the property, with the executor never called. It failed because the executor ran and returned `found`. To pass it, `execute` now checks a static tool's input against its compiled schema before the executor runs. Bad input gets back `{result: "Invalid input for tool <name>: <path> <what failed>"}` and a warning log that holds only paths and messages, never the input values. `execute` also has the one-line doc comment pointing at the spec. My test now passes, along with the existing register-time test in the same file. Nothing else was run here, as the round rules require.

**CI fixes from the last push:**
- **typecheck and test:** ajv is a CommonJS package, so importing `{Ajv}` by name broke both the typecheck and the test run. It now uses the default import and takes `.default` from it; I checked under plain Node ESM that this gives the class.
- **eslint, `registry.ts`:** the error rethrown from `register` now carries `{cause: error}`.
- **eslint and spec-links, spec file:** the spec statement had two separate `([validated by …])` blocks, and the linter only reads the last one, so the acceptance test at line 94 looked unlinked. I merged them into one block with comma-separated links, which is how the rest of the repo does it. The new test is linked to its statement as well, and every `#L` link points at the right line.
- **eslint, acceptance test:** I fixed two lint errors in the stub provider of `registry.acceptance.test.ts` by flipping the `if` to an early return and destructuring `firstBlock`. No assertion or behaviour changed, but it is still an edit to an acceptance test, so check it.

**Red tests:** one was mine, now green. None were regressions: the `chatOrchestrator.test.ts` suite failure came from the ajv import and is fixed.

**Still open:**
- Function-valued tool sources aren't validated yet. That is the next facet (a `WeakMap` cache of compiled validators), and the orchestrator-retry acceptance test will stay red until it lands.
- The `MINOR` version bump, the doc updates and the changelog entry haven't been done.
- I added one new facet to `.lore/dod.md`: a unit test for the wrong-type rejection. That behaviour works now, but only the acceptance test covers it.

**Not acted on:** the spec-link parser silently ignores every link block on a statement except the last one. That trap is worth knowing about in other specs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute before the executor, returning a ToolResponse naming failing paths/constraints without values (plus CI fixes: ajv import, cause, spec links, acceptance-test lint)","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap) and validate per call"}}