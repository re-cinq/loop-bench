The red eslint finding is fixed and pushed, but this round closed no facet, so the ticket is not done.

**What was wrong:** the three `require-spec-link` errors on `orchestratorHelpers.test.ts` (lines 36, 42, 48) were not the test files. The citations existed in `specs/hal-engine-config-hooks/spec.md`, but they sat mid-statement, and `check-spec-links.mjs` only counts a citation in a statement's trailing parenthetical. Lines 29 and 30 of that spec had the same misplacement, so I fixed them too.

**What I changed:** in `specs/hal-engine-config-hooks/spec.md`, I merged each statement's citations into one trailing parenthetical, comma-separated, using the same form as the before-tool-call spec. The test names and line numbers are unchanged. `check-spec-links.mjs` now reports 0 misplaced across all specs, and prettier reports the file unchanged.

**Pushed:** commit `e796b7b`, which matches `origin/loop-bench/93`. `origin/main` was already merged in, so there was nothing to merge. Its message is `docs(orchestrator): trail usage test citations in hooks spec`, with the Co-Authored-By line.

**Not done this round:**
- The facet "Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit" is still unticked in `.lore/dod.md`. It needs a type change to the `afterModelResponse` argument, and I did not start it. I skipped it because it is a public-type change, I would have to run `lore-query-trace` first, and it needs a fresh red test. The next round takes it.
- I did not run the acceptance tests or any test here. I did not run lint or typecheck either, per the brief.
- I did not run `npm run spec:names`, which would confirm the test names in the citations still match.
- No test I wrote this round, so no red tests were mine and no regressions are involved.

Unrelated smell noticed, not acted on: `specs/hal-engine-config-hooks/spec.md` line 25 says "issue #93 defines the aggregate usage", which reads as a ticket reference inside a normative spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none this round (CI eslint spec-link findings fixed; no facet closed)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}