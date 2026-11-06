I closed the first three facets of #37 and pushed them. The branch is up to date with `origin/main` and not ahead of its upstream. The only test I ran here was `registry.test.ts`, and it passes. I ran none of the acceptance tests, the typechecker or lint, so CI is the judge of those.

**What changed**
- **Test:** `src/orchestration/tools/registry.test.ts` has one test. A tool requiring `location` is called with `{}`. The result must name `location` as required, and the executor must not run.
- **Red:** the test failed first because the executor ran and returned `sunny`.
- **Dependency:** `ajv@^8.20.0` is in `dependencies`, and the version is bumped to `0.4.0`. The existing `node_modules` held ajv 6, so I ran `npm install ajv@^8`, which updated `package.json` and `package-lock.json`.
- **`registry.ts`:**
  - A static tool's schema is compiled in `register`. A bad schema throws `Invalid inputSchema for tool <name>: …`.
  - A function-valued tool's schema is compiled per call and cached in a `WeakMap` keyed by the schema object.
  - `execute` validates before calling the executor and returns `{result: 'Invalid input for tool <name>: …'}` on failure. The message names the field path, the expected type or the missing property, and never a value. The log line carries the same text.
  - `execute` has the one-line doc comment pointing at the spec.
  - The `Unknown tool` throw is unchanged.
- **Spec and checklist:** the required-property statement in `specs/hal-engine-tool-input-validation/spec.md` now also links the new test. In `.lore/dod.md` I ticked the first three facets.

I did not write tests for the other checks (type, `enum`, compile-once, register-time throw), so those are covered only by the acceptance tests that CI will run.

None of the tests that were red this round were regressions.

**Next round:** the fourth facet.
- the remaining tests in `registry.test.ts`
- the tool-loop test in `chatOrchestrator.test.ts`
- spec links for the other statements
- the docs, `example/weather-tool.ts`, `CHANGELOG.md`, and the spec `Status` row

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv dependency, register-time compile with WeakMap cache, and execute-time input validation","tdd_next":"remaining registry/orchestrator unit tests, spec links, docs, example, CHANGELOG"}}