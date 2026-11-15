I pushed a CI repair for the three red checks on f3ae10f. Locally, only my own test file `src/orchestration/tools/registry.test.ts` ran (2 of 2 pass). The acceptance tests and other suites didn't run here, and CI will judge the new push.

- **Typecheck and test (the ajv errors):** the repo itself is fine. `package.json` and the lockfile pin ajv 8.20.0 at the root, and `npm ls` confirms it, with ajv 6.15.0 only nested under eslint. CI's errors still look like it resolves `ajv` to 6, which is the root version on `main`. The last round blamed a stale CI install, but this is the second verdict in a row showing it. I couldn't see why, because the Lore CI-log tool returned 404 for this branch. So I made `registry.ts` work under either version:
  - It now uses a default import and picks the class from either version's export shape.
  - Validation errors are read through a small local type that takes the error path from ajv 8's `instancePath` or ajv 6's `dataPath`.
  - I checked ajv 6 directly with a short script: it reports the missing required property, reports the wrong type with its path, and throws on an invalid schema.
- **eslint `re-lint/max-expects` at `registry.test.ts:28`:** the test now makes one `toEqual` assertion covering both the result and the executor's calls. The test title stays on line 28, so the spec link to `#L28` still points at it.
- **Red tests:** none of the CI failures were regressions. All of them came from this ticket's own registry change (the ajv import), and none were tests I wrote this round.

`.lore/dod.md` is updated with this resolution and the eslint repair ticked. The branch is pushed and merged with `origin/main` (nothing new there), and `git status` shows it level with its upstream.

Unrelated smells, which I left alone: the coverage floors in `jest.config.js` carry very long explanatory comment blocks, and if CI really is installing ajv 6 at the root, its install step doesn't match the lockfile. That's worth a separate look.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI on f3ae10f: ajv loaded and its errors read independent of major version (6/8); registry.test.ts single toEqual for re-lint/max-expects","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap)"}}