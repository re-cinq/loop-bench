This round fixed the four eslint errors from the last CI verdict. All were in my own tests, so none were regressions. I did not run eslint here, so CI has to confirm the fix.

- **Spec links:** I added three statements to `specs/hal-engine-config-hooks/spec.md`, one for each rule below. Each carries a `validated by` link to the helper tests, plus the acceptance test in the third. This clears the missing-link errors.
  - Each token field is added to the turn total.
  - A round with no reported usage leaves the total unchanged.
  - A turn where nothing reported passes `undefined`.
- **Split test:** I split the `sumUsage` test that had three `expect` calls into three single-assertion tests in `src/orchestration/orchestratorHelpers.test.ts`. The `#Lnn` links match the new lines; `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I checked them by hand.
- **Test run:** `orchestratorHelpers.test.ts` passes (8 tests). I didn't run the acceptance tests.
- **Checklist and push:** I ticked the last facet in `.lore/dod.md`. The merge with `origin/main` was a no-op, and the branch is pushed and level with its upstream.

I noticed no unrelated smells.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint spec-link and max-expects findings on usage tests","tdd_next":"acceptance green"}}