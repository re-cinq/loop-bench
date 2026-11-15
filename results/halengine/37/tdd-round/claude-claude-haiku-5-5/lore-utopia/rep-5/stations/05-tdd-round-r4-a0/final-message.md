The CI typecheck failure is fixed and pushed. This round's test passed on its first run, so the red phase didn't happen.

**What I did**
- **CI finding fixed:** `src/orchestration/tools/registry.ts:8` failed typecheck because `validateFormats` is not an Ajv 8 option. I dropped it and now construct `new Ajv({strict: false})`. I did not run `tsc` here, so this fix is verified only by CI.
- **TDD facet, required property:** I added a unit test to `registry.test.ts` that registers a tool requiring `location`, calls `execute` with `{}`, and asserts the result names `'location'` and the executor is called 0 times. It passed immediately. The rejection behaviour was already present from the enum commit, so no red phase was observed. I did not add code for it.
- **Spec and dod:** I re-anchored the shifted `registry.test.ts#L` links in `specs/hal-engine-tool-input-validation/spec.md` by hand (there is no reanchor script in this repo) and added a citation for the new test. I ticked the required-property facet in `.lore/dod.md` and noted the CI fix there.
- **Tests run:** only `src/orchestration/tools/registry.test.ts`, via `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath`. The plain `npx jest` path fails on this repo's ESM setup. 5 of 5 passed. Acceptance tests were not run.
- **Red tests this round:** none written as red. Regressions: none observed locally.
- **Delivery:** formatted with prettier, committed, pushed. The branch is not ahead of its upstream. `origin/main` merged in with no conflicts.

**Still open:** the wrong-type and no-value-leak facet is next. The `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `CHANGELOG.md`, version bump, and orchestrator tool-loop facets are also unchecked. The spec's status row is still `In Progress`.

**Not done here, noted for later:** `ajv` options: `strict: false` is set, but there is no `validateFormats` equivalent, so `format` keywords are unvalidated and that should be documented.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Required-property rejection naming the property and 'required' (unit test in registry.test.ts; passed first run, no red observed)","tdd_next":"Wrong-type rejection naming field path and expected type, with no offending value in result or logs"}}