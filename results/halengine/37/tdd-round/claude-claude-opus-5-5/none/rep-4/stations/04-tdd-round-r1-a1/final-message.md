I pinned one facet this round: valid input that carries an undeclared extra property now has a test proving it reaches the executor unchanged, exactly once. It's committed and pushed, `origin/main` merged with nothing new, and the branch isn't ahead of its upstream.

**The round:**
- **Red:** the behaviour already worked, so the new test in `src/orchestration/tools/registry.test.ts` passed at once. To prove it can fail, I set ajv to `removeAdditional: "all"`, which strips unlisted properties, and the test went red. I then reverted that change.
- **Green:** 4/4 tests in `registry.test.ts` pass, run on that file alone.
- **Refactor:** the existing `countingRegistry` helper became `recordingRegistry`, which records each executor input; the call count is now the length of that list.
- **Traceability:** the matching statement in `specs/hal-engine-tool-input-validation/spec.md` now links to the new test. The three existing `registry.test.ts` links moved down (to lines 29, 56 and 73), and I fixed them by hand because this repo has no `reanchor.mjs`. The acceptance-test links were still correct.
- **dod.md:** I ticked this facet and split the rest of the unit-test facet into smaller unchecked items.

**Red tests:** 0 were mine and 0 were regressions. The CI verdict in the brief is for `05309a0`, and the last round already pushed `65454c4` on top of it. That push fixed the missing `cause` on the thrown error and reworked the test setup to remove the code duplicated with the acceptance test. Whether those two lint errors are really gone is CI's call.

**Still open:**
- **Wrong ajv version in CI:** the CI verdict's ajv errors (`'Ajv' only refers to a type`, `instancePath`, and "does not provide an export named 'Ajv'") match ajv 6 being installed at the root. But `package-lock.json` pins `node_modules/ajv` to 8.20.0, and the only ajv 6 is eslint's nested copy. Locally, `import {Ajv} from 'ajv'` works with 8.20. I couldn't find a cause in the repo. If the next verdict shows these again, look at CI's install, not the import.
- **Lint in the acceptance test:** `registry.acceptance.test.ts:141` and `:143` break `re-lint/prefer-early-return` and `re-lint/max-member-chain`. Rounds aren't allowed to edit acceptance tests, so CI's eslint step stays red until the test's author fixes those lines.
- **Coverage query skipped:** `lore-query-trace` and the other `lore_*` tools weren't available in this session, so I didn't ask the graph which tests cover the file first. I only changed a test file and spec text, not source.

Unrelated smells: none acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Valid input with an undeclared extra property reaches the executor unchanged, exactly once","tdd_next":"Pin in registry.test.ts: static schema compiled once across ten execute calls; function-valued schema validated against the current one; Unknown tool still throws"}}