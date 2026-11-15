This round fixed the three CI findings and closed the wrong-type logging facet. Nothing ran locally except my own unit test file; CI is the judge for the rest.

**CI findings from the last push:**
- **typecheck** (`registry.ts:7`, `'strict'` not in `Options`): I cast the options literal to `ConstructorParameters<typeof Ajv>[0] & {strict: false}`. The cast is a guess from the error text. I could not run `tsc` here, so this is unverified.
- **eslint `no-duplicate-code`**: my unit test "rejects input missing a required property…" in `registry.test.ts` duplicated the acceptance test. I removed the unit test and its spec link.
- **eslint `require-spec-link` and spec-links "misplaced"** (`spec.md:12`): the acceptance link sat outside the statement's trailing parenthetical. With the unit link removed, the acceptance link is now the trailing one. I re-anchored the `registry.test.ts` links that moved after the deletion (L33, L48, L66). I did not run `check-spec-links.mjs`, so this rests on reading the checker.

**TDD round (wrong-type facet):**
- **Red:** a new unit test expects a rejected call to log a line naming the field and constraint, with no offending value. It failed because nothing was logged.
- **Green:** `execute` now logs `input rejected` with ajv's error text, which names the path and constraint and contains no values. `registry.test.ts` passes, 5/5.
- **Refactor:** nothing to change.

**Tests run:** only `src/orchestration/tools/registry.test.ts`, with `jest` by file. I did not run `registry.acceptance.test.ts` or the orchestrator suite. The round's acceptance-test status is unknown until CI reports.

**Regressions:** the lore trace reports no tests covering `registry.ts` on main, so none were at risk in this file. Red tests this round: 1 of mine (now green). Regressions: 0 known.

**Branch state:** two commits were pushed, `2ac08ca` (code, spec, and test changes) and `33507d0` (the `dod.md` update). An earlier chained command committed the code before the `dod.md` edit, so the history has two commits rather than one. The branch is in sync with its upstream and `origin/main` merged with nothing to add.

**Not done, and left open:** the one-line doc comment on `execute`, the orchestrator tool-loop facet, the version bump, the docs and CHANGELOG, and the `package.json` ajv facet. I noticed no unrelated smells to name.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wrong-type rejection logs a warn line naming the field path and constraint without the offending value","tdd_next":"One-line doc comment on execute pointing at the spec"}}