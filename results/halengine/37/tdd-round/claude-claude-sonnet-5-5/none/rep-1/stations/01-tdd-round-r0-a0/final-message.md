This round added `ajv` and made `ToolRegistry.register` compile a static tool's `inputSchema`, so a broken schema now throws at startup. `execute` doesn't validate input yet, so none of the four acceptance tests are green. I didn't run them, as instructed, and CI will judge the push. The branch is pushed and not ahead of upstream. Merging `origin/main` brought nothing in.

- **Dependency:** `ajv@^8` is in `dependencies` (`strict: false`, `validateFormats: false`), and the version is bumped 0.3.0 → 0.4.0. The `ajv` already in `node_modules` was a v6 pulled in by another package, so `npm install` also changed the lockfile entries for that tree.
- **Register-time compile:** `register` now compiles a static definition's schema and throws `Invalid inputSchema for tool <name>: …`. The tool is left unregistered.
- **Test:** the new `src/orchestration/tools/registry.test.ts` has one test for this, and it passes locally. I linked it from the compilation statement in `specs/hal-engine-tool-input-validation/spec.md`.
- **Checklist:** I ticked the `ajv`/version facet in `.lore/dod.md`. The compile facet stays open and is annotated, because the `WeakMap` cache for function-valued sources isn't written yet.
- **Test results:** the round ran only my own test. All of it was mine; there were no regressions.

Not done and not run here: the full-suite jest run, the linter, the typecheck, and `scripts/spec-links/reanchor.mjs` (it doesn't exist in this repo). The `#L4` anchor in the spec is the test's line, checked by hand.

The next round takes `execute` validation (rejection `ToolResponse` without leaking values, one-line doc comment) and the function-valued schema cache.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"add ajv dependency, bump MINOR, compile static inputSchema at register time","tdd_next":"validate input in ToolRegistry.execute (rejection ToolResponse without values) and WeakMap cache for function-valued schemas"}}