I closed one facet: `ToolRegistry.execute` now validates input against the tool's `inputSchema`. I ran only `registry.test.ts`, and both of its tests pass. I did not run the acceptance tests, the typecheck, eslint or the full suite, so CI will judge those. The branch is pushed and not ahead of its upstream. The merge of `origin/main` produced no conflict output.

The CI failures from the last push are addressed as follows:
- **typecheck and test (`ajv` import):** `import {Ajv}` failed because `ajv` is CommonJS. I switched to a default import, cast to the class type, in `registry.ts`.
- **eslint `preserve-caught-error`:** the register-time error now carries `{cause: error}`.
- **eslint `max-expects`:** `registry.test.ts` now has one `expect` per test.
- **eslint in `registry.acceptance.test.ts`:** I flipped the `round !== 2` branch and destructured the tool result. This was a style-only edit to an acceptance test. Its assertions are unchanged, but you may want to check it.
- **changelog:** `CHANGELOG.md` has an entry under Unreleased.

**New behaviour:**
- **Rejection:** input that fails validation returns `{result: 'Invalid input for tool X: …'}` and the executor never runs. The message names the failing paths and the constraint (`required`, `type`, `enum`) and never a property value. The log line carries the same text.
- **Validator cache:** validators are cached per schema object in a `WeakMap`. The static compile at `register` and the per-call function-source path use the same cache.
- **Doc comment:** `execute` has a one-line comment pointing at the spec.
- **Test and spec link:** I added a test that valid input with an extra property reaches the executor unchanged, once. The spec statement for it now links to that test.

**Next round:**
- **Tests:** unit tests for wrong-type and no-value-leak, function-valued schema changes between calls, compile once across ten calls, `Unknown tool`, and the orchestrator tool-loop test.
- **Docs and spec links:** the remaining spec links, the doc updates (`docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, ADR-002, `example/weather-tool.ts`), and the spec Status change. `scripts/spec-links/reanchor.mjs` does not exist, so I checked the `#Lnn` links on the spec statements I touched by hand.

Red tests that were mine: the 4 CI check failures, which were all ajv import or lint issues. Regressions I caused: none identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"execute validates input against inputSchema (rejection ToolResponse without values), ajv import and lint fixes","tdd_next":"remaining unit tests (wrong-type no-leak, function-source schema change, compile-once, unknown tool, orchestrator tool-loop), docs/README/.specify/ADR updates, spec links"}}