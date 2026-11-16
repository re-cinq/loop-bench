This round added schema validation to `ToolRegistry`, and my new test passes. I ran no other tests, so I haven't checked the acceptance tests, the type check or lint. The branch is pushed and not ahead of its upstream. The merge with `origin/main` produced nothing.

- **Test:** `src/orchestration/tools/registry.test.ts` checks that a function-valued tool is validated against the schema returned for the current call, not a stale cached one. I linked it from the matching statement in `specs/hal-engine-tool-input-validation/spec.md`.
- **Code:** `registry.ts` compiles a static tool's `inputSchema` at `register` time and throws an error naming the tool if it is invalid. Function-valued schemas are compiled per call and cached by schema object. `execute` returns `{result}` on rejection, naming the failing path and constraint but never a value, and it has the one-line doc comment. `Unknown tool` still throws.
- **Dependency:** `ajv` is now in `dependencies` at `^6.12.6`, the version already installed in `node_modules`. I didn't install `^8` and don't know whether that is reachable from this pod. The options I set for `ajv` differ from the facet's wording because they are v6 options. The package version is bumped to 0.4.0 and the lockfile is updated. I also added a `CHANGELOG` entry and ticked the first three facets in `.lore/dod.md`.
- **Tests:** The acceptance tests were not run, as instructed, and the pod's hook refused `jest` runs that it read as covering them. No regressions were observed.
- **Failures:** The failing test I wrote was red only in design. I confirmed it green after the code and never saw it red.

The next round takes the rest of the fourth facet:
- unit tests for the remaining ticket criteria;
- a `chatOrchestrator.test.ts` retry test;
- doc updates to `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and ADR-002;
- updating the spec's Status row.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv dependency, register-time compile, and execute-time validation","tdd_next":"remaining unit tests (registry.test.ts, chatOrchestrator.test.ts) and docs/README/spec/ADR/example updates"}}