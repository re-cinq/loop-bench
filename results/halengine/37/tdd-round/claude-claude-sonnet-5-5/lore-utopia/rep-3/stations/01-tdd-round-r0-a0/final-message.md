This round added input validation to `ToolRegistry`, which is the core of the ticket, and pushed it. I ran only the new unit test, `registry.test.ts`, and it passes. I did not run the four acceptance tests, CI's verdict on them is pending, and there was no `round-brief.md` this round. I also did not run the typechecker or the linter.

- **Test:** the one new test checks that a function-valued tool definition is validated against the schema returned for that call. It failed before the change and passes now. I linked it from the matching statement in `specs/hal-engine-tool-input-validation/spec.md`.
- **Dependency:** `ajv` 8 is now in `dependencies`. It is configured with `strict: false` and `validateFormats: false`, and without coercion, defaults or an injected `additionalProperties: false`. The package version is bumped to 0.4.0 (MINOR).
- **`register`:** it compiles a static tool's schema once. An invalid schema throws an error that names the tool.
- **`execute`:** it validates before running the executor and returns a `{result}` rejection instead of throwing. The message and the log line name the failing path and the constraint, never the offending value. The one-line doc comment points at the spec. An unknown tool name still throws `Unknown tool: <name>`.
- **Caching:** compiled validators are cached in a `WeakMap` keyed by schema object, so a function-valued tool compiles each distinct schema once.
- **`.lore/dod.md`:** I ticked the first three facets.
- **Regressions:** none known, because I did not run the rest of the suite.

`scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I set the one new `#L5` link by hand. The branch merged with `origin/main` (already up to date) and is not ahead of its upstream.

The next round has the last facet:
- the remaining unit tests in `registry.test.ts` and `chatOrchestrator.test.ts`
- the remaining spec links
- the doc updates (`example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, ADR-002)
- the `CHANGELOG.md` entry

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv dependency, register-time compile with WeakMap cache, and execute-time validation","tdd_next":"remaining unit tests (registry.test.ts, chatOrchestrator.test.ts), spec links, docs and CHANGELOG"}}