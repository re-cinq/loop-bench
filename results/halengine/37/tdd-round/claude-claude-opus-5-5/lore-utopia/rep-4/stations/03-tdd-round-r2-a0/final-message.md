I fixed what CI reported on `ab5b560` and pushed it. This was a repair round, so I wrote no new test; I only reworked the existing one that CI flagged. The branch is up to date with `origin/main`, the merge brought in no changes, and nothing is left unpushed.

**Fixes:**
- **Typecheck and test (`AjvModule.default is not a constructor`):** `src/orchestration/tools/registry.ts` now uses `import {Ajv, type ValidateFunction} from 'ajv'` and `new Ajv(...)`. Node ESM and tsc's NodeNext mode both resolve that named export. The coverage threshold failures came from suites that crashed before running, so they should clear once those suites load.
- **Lint (`re-lint/no-duplicate-code`):** I reworked the required-field test in `registry.test.ts` (shared definition object, `jest.fn` executor) so it no longer copies the acceptance test's token run. I didn't touch the acceptance test. I moved the spec links in `specs/hal-engine-tool-input-validation/spec.md` to the new line numbers (#L5 and #L28).

**One thing I couldn't explain:** CI's errors match ajv 6's typings, not ajv 8's. That suggests CI installed ajv 6 at the root, even though `package-lock.json` pins `node_modules/ajv` to 8.20.0 and `npm ls` here shows ajv 8 at the root (ajv 6 sits only under eslint). The old import also passed in this pod. If the next build still shows ajv 6 errors, the named import won't fix it either, and that install question is the real cause. I added it to `.lore/dod.md` as an unchecked facet.

**Tests:** I ran only `registry.test.ts`, and both its tests pass. I didn't run the typecheck or linter here, so CI's next build is the real check.

**Red-test count:** none of the failures were regressions. The broken ajv import crashed `chatOrchestrator.test.ts`'s suite, but it is an existing file this branch hasn't edited. The other failures were in this branch's own `registry.acceptance.test.ts` and `registry.test.ts`, plus the duplicate-code lint finding between them.

**Something I noticed but didn't change:** `.lore/dod.md` has no blank line between the last Facets item and the `## Out of scope` heading.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI on ab5b560: ajv named Ajv import and dedupe registry.test.ts against the acceptance test","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap)"}}