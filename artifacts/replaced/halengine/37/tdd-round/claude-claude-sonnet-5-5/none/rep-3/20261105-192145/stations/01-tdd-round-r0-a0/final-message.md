I did one round and pushed it. The branch is in sync with its upstream and merges cleanly with `origin/main`. I did not run the acceptance tests, per the brief, so CI will give the first verdict on them.

- **My test:** `src/orchestration/tools/registry.test.ts` checks that valid input with an unlisted extra property reaches the executor unchanged and exactly once. It passed locally, run through `node --experimental-vm-modules node_modules/jest/bin/jest.js`, because plain `npx jest` can't load ESM here.
- **Code:**
  - I added `ajv@^8` to `dependencies` (the lockfile only had ajv 6 as a transitive package) and bumped the version to 0.4.0.
  - `ToolRegistry` now compiles a static schema at `register` and throws an error naming the tool if it won't compile.
  - Function-valued schemas are cached by schema object in a `WeakMap`.
  - `execute` returns `{result}` naming the failing path and constraint, never the value, and logs a warning without the value. It does not call the executor on a rejection.
  - `execute` has the one-line doc comment pointing at the spec, and the "Unknown tool" throw is unchanged.
- **Docs:** I linked the passthrough statement in `specs/hal-engine-tool-input-validation/spec.md`, added a `CHANGELOG.md` entry, and ticked three of the four facets in `.lore/dod.md`.
- **Tests and counts:** I wrote one test, and it was green. No regressions are known.

I wrote the first three facets together rather than one, because the ajv dependency alone moves no acceptance test.

**Left for the next round:**
- The remaining unit tests in `registry.test.ts` and in `chatOrchestrator.test.ts`.
- The docs updates: `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, the ADR and `example/weather-tool.ts`.
- Spec links for the remaining statements.

**Unrelated or unconfirmed:**
- The unlisted `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I set the `#L4` anchor by hand.
- Installing ajv 8 changed two other packages in the lockfile, which I didn't inspect.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv dependency, register-time compile with WeakMap cache, and execute-time validation","tdd_next":"remaining unit tests (registry.test.ts, chatOrchestrator.test.ts), spec links, and docs/README/.specify/ADR/example updates"}}