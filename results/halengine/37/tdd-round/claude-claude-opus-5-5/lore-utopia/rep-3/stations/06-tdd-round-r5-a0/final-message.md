I closed this round's facet and pushed it. A rejection for a missing `required` property now logs the property's own path (`/location`) instead of an empty `path: ''`.

**Red → green:** I added the test `logs a missing required property by its path rather than the parent object` to `src/orchestration/tools/registry.test.ts`. It failed because the log said `path: ""` instead of `"/location"`. The fix is a small `failurePath` helper in `registry.ts` that adds ajv's `params.missingProperty` (a property name, never a value) to the path. The registry test file now passes: 7 of 7. I ran only that file.

**CI findings from the last push:**
- **Lint (3 findings), fixed:** the two tests that repeated the same setup now share `registerCountingWeatherTool` and `recordWarnings` helpers. The test with two `expect` calls now asserts a single object, with `leaksValue: false`.
- **Typecheck and test failures (ajv), not fixed and not explained:** all of these errors are what ajv 6 would produce: `Ajv` only exists as a type, `ErrorObject` has no `instancePath`, and there is no named `Ajv` export. But a fresh `npm ci --ignore-scripts` of this lockfile installs ajv 8.20.0, `npm ls` puts ajv 6 only under eslint, the branch merges cleanly with `origin/main`, and the suite passes here. I could not read CI's own log because the Lore CI lookup returned 404 for this branch. So I left the `import {Ajv} from 'ajv'` line alone; it has already been flipped back and forth across three rounds. If CI reports the same errors again, the next round should check which ajv version CI's Install step actually puts in place. I recorded this in `.lore/dod.md`.
- **Red tests:** every red test CI named was a suite that failed to load because of the ajv import, not a failing assertion. As far as the verdict shows, that's 0 regressions caused by this round's code. This round's only red test was the new one, and it is green.

**Traceability:** there is no `reanchor.mjs` in this repo, so I updated all six `registry.test.ts#Lnn` links in `specs/hal-engine-tool-input-validation/spec.md` by hand. I also added a spec statement for the new test with its link. The repo has no convention for stamping a spec anchor in a test, so I didn't add one. I did not run the `tests_covering` coverage query before editing.

**Next facets added to `.lore/dod.md`:** a test that valid input with an extra property reaches the executor unchanged, exactly once; a test that `Unknown tool: <name>` still throws; and the MINOR version bump, which is still owed.

**Something I noticed but didn't touch:** `.lore/dod.md`'s first four high-level facets are still unchecked even though the detailed facets below them already cover most of that work.

The branch is pushed; `git status` shows it is not ahead of `origin/loop-bench/37`. Merging `origin/main` brought in nothing.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Name the missing property in a required-rejection's log entry (params.missingProperty); fixed CI's registry.test.ts lint findings","tdd_next":"Test valid input with an extra property passes through unchanged exactly once, and Unknown tool still throws"}}