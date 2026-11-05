I closed the two facets for `execute` validation and the function-valued schema cache, and fixed every finding in CI's red verdict. The commit is pushed and the branch is level with its upstream. `origin/main` was already merged in.

I ran only `registry.test.ts` here, and its 2 tests pass. I did not run the acceptance tests, the full suite, lint or the typechecker, so CI will say whether the fixes took.

- **Validation:** `ToolRegistry.execute` now validates `input` before the executor runs and returns a rejection `ToolResponse` instead of throwing. The rejection names the failing paths and constraint, never the submitted values. The `Unknown tool` throw is unchanged. It also carries the one-line doc comment pointing at the spec.
- **Cache:** function-valued schemas are compiled per schema object and cached in a `WeakMap`.
- **typecheck, test and the `ajv` failures:** the `Ajv` import now works under NodeNext ESM. This one error was behind the typecheck failure and the "does not provide an export named 'Ajv'" test suite failures.
- **eslint:**
  - The thrown error now carries `cause`.
  - `registry.test.ts` asserts a single object per test.
  - The tool-loop provider stub in `registry.acceptance.test.ts` is restructured to use an early return and a shorter member chain. That is a lint-only edit to an acceptance file with no behaviour change, because the lint findings were owed this round.
- **changelog:** I added the `CHANGELOG.md` entry.
- **New test:** I added the function-valued-schema test and its spec link, anchored to `registry.test.ts#L27` by hand since `scripts/spec-links/reanchor.mjs` doesn't exist in this repo.

Red tests this round: none were mine from a regression. The earlier red run was the `Ajv` import failure, which I fixed.

Still open in `.lore/dod.md`:
- tests for extra-property passthrough, compile-once across ten calls, `Unknown tool`, and the log-leak check
- the `chatOrchestrator.test.ts` retry test
- the docs, README, `.specify/spec.md`, ADR-002 and weather-tool updates
- the spec status header, which is still "In Progress"

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"execute validates input with WeakMap-cached validators for function-valued schemas; CI lint/typecheck/changelog findings fixed","tdd_next":"remaining unit tests (extra-props passthrough, compile-once, unknown tool, chatOrchestrator retry) and docs/README/.specify/ADR/weather-tool updates"}}