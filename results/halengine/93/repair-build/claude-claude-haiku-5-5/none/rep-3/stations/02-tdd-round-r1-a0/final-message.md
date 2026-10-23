Branch is up to date. Now let me update the DoD to reflect that this fix round addressed the CI failures (no new facet was closed — the existing facets remain ticked, and I fixed a spec-link formatting issue that was blocking CI).

The DoD facets were already all ticked. The CI failures were about misplaced spec citations — a formatting error in the spec file, not a missing facet. No DoD update is needed since no facet changed state.

**What happened:** The previous round had placed multiple `([validated by...])` parentheticals in sequence at the end of each statement in `specs/hal-engine-config-hooks/spec.md`. The spec-link-parser only indexes links from the LAST `(...)` per statement, so earlier citations were reported as "misplaced" by `check:spec-links` and invisible to `require-spec-link` ESLint rule. Fixed by merging all citations for each statement into a single comma-separated trailing parenthetical.

**Unrelated smells noticed:** None.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix misplaced spec citations — merged multi-citation parentheticals","tdd_next":"acceptance green"}}