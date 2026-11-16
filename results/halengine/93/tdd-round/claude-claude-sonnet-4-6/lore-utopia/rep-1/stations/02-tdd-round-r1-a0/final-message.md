Branch is up to date and nothing left to push. Now updating the DoD to mark the spec-link fix.

The DoD already has all 4 facets ticked. The CI failure I fixed was an eslint error from the previous round (missing spec links for 5 tests). I added 5 spec statements to `specs/hal-engine-config-hooks/spec.md`, each citing one of the uncited tests. No new facet was needed — this was repair work from the red build.

0 regressions caused, 0 test regressions. The round fixed 5 ESLint `require-spec-link` errors by adding spec statements in the hooks spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix 5 require-spec-link ESLint errors by adding spec statements for accumulateUsage and gap-round tests","tdd_next":"acceptance green"}}