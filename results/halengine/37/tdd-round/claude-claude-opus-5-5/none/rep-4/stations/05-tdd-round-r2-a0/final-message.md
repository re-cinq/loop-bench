I added one test, committed it and pushed it. The branch is up to date with `origin/main` and not ahead of its upstream. CI's last verdict is still red, and I couldn't reproduce or fix any of it from this tree.

**What CI reported on 63a94da:**
- **Typecheck and test failures:** all of them come from CI finding ajv 6 (no `Ajv` export, no `instancePath`) instead of ajv 8. I couldn't reproduce this. The branch's `package-lock.json` puts ajv 8.20.0 at the root and keeps eslint's ajv 6 nested under eslint. A clean `npm ci --ignore-scripts` from that lockfile, using CI's node 22 and npm 10, installs ajv 8.20.0, and `registry.test.ts` passes here. Something in how CI installs is giving it a different `node_modules` than the lockfile describes; I can't see CI from this pod. I recorded the check in `.lore/dod.md`.
- **Two eslint errors:** both are in `registry.acceptance.test.ts:141` and `:143` (`prefer-early-return` and `max-member-chain`). That is an acceptance test, which rounds may not edit, so its author has to fix them. They are already logged in `.lore/dod.md`.
- None of the red tests are mine (my test passes here). The failure in `src/config.test.ts` is a test from before this branch, so it counts as a regression this branch caused. But it has the same ajv-import cause, so I count 0 red tests of mine and 1 regression, with the cause above.

**This round:**
- **Red:** added `compiles a static tool schema once across ten execute calls` to `src/orchestration/tools/registry.test.ts`. It passed straight away because earlier rounds already wrote this code. To check that it can catch a regression, I temporarily changed `execute` to compile the schema on every call: the test failed with 11 compile calls instead of 1. I then put the code back.
- **Green:** with the real code, all 5 tests in `registry.test.ts` pass. That is the only test file I ran.
- **Refactor:** nothing needed.
- **Traceability:** linked the "compiled at register time and reused on every `execute` call" statement in `specs/hal-engine-tool-input-validation/spec.md` to the new test. Adding the test moved another test down, so I fixed that test's link by hand from #L73 to #L88; this repo has no reanchor script.
- **dod.md:** ticked the static-compile pin and split the rest of that item into a new unchecked facet.
- I couldn't ask `lore-query-trace` which tests already cover the file, because that tool isn't available in this pod. This round changed no source code, so nothing depended on it.

**Smells I noticed and didn't touch:** the spec's `Unknown tool` statement has no linked test yet (it's part of the next facet), and the spec's `Status` row still reads `In Progress`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pin in registry.test.ts: a static schema compiles once across ten execute calls","tdd_next":"Pin in registry.test.ts: a function-valued schema that differs between calls is validated against the current one; Unknown tool still throws"}}