The push landed. All three CI failures are fixed:
- **eslint** (require-spec-link): 3 tests at lines 423, 488, 545 now have correct spec citations pointing to their current lines
- **spec-names**: all 7+ stale line numbers in `specs/hal-engine-architecture/spec.md` updated (+22 shift from beforeSession test insertion)
- **spec-links**: merged two consecutive `([validated by ...])` parentheticals into one trailing parenthetical in `specs/hal-engine-config-hooks/spec.md`

No new tests were written (all DoD facets were already ticked); this round fixed CI quality-gate failures blocking the acceptance test run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: spec-names, spec-links, eslint require-spec-link","tdd_next":"acceptance green"}}