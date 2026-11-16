I committed and pushed four acceptance tests that fail today. The branch is level with its upstream and merged with `origin/main`. I ran them with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`.

**Strategy: `direct`.** `ToolRegistry.register` and `execute` can be called as they are, so I called them in the tests.

The tests are in `src/orchestration/tools/registry.acceptance.test.ts`. I also created `specs/hal-engine-tool-input-validation/spec.md`, which links each test, and `.lore/dod.md`. I ran only the one test file.

Each test fails because validation is absent:
- **Missing required property:** `{}` for a required `location` gets back `"ok"`, not a rejection naming `location`. The test expected `"location"` in the result and got `"ok"`.
- **Wrong-typed field:** the executor is called for `{location: 918273645}`. The test expected 0 calls and got 1.
- **Uncompilable schema:** `register` does not throw. The test expected a throw naming `broken_tool` and got none.
- **Function-valued definition:** after the returned schema changes to require `b`, `{a:'x'}` still gets `"ok"`. The test expected `"b"` in the result and got `"ok"`.

I left five acceptance criteria out of this file, and they are in the DoD facets for later rounds:
- **Extra-property passthrough and the `Unknown tool` throw:** both already pass today, so they would not be red.
- **Compile-once across ten calls:** it cannot be observed without a mock, so it needs a seam.
- **`chatOrchestrator` retry loop:** only the rejection path is pinned here; the retry round-trip is not.
- **Docs, `CHANGELOG`, one-line doc comment, `package.json` dependency:** these are doc and config work, not behaviour tests.

`ajv` exists in `node_modules` only as a transitive dependency. It is not in `package.json`, so the implementing round must add it to `dependencies`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}