The push landed and there's no merge drift. The fix was a one-line change in `specs/hal-engine-config-hooks/spec.md`: the three separate `([validated by: ...])` parentheticals on line 28 were merged into a single trailing parenthetical, with the three links comma-separated inside it. This resolves all three CI failures:

- **spec-links**: `#L38` and `#L57` were "cited outside the statement's trailing parenthetical" — they're now inside the single trailing parenthetical alongside `#L30`.
- **require-spec-link**: both `usageReporting.acceptance.test.ts` tests showed as having no spec link because their citations were misplaced — the citations are now valid.
- **require-status-matches-coverage**: the "Shipped" status now matches coverage once all citations are in their proper trailing parenthetical.

No regressions were introduced (0 tests written this round — the CI fix was a prose change to a spec file). No new facets discovered; all DoD facets remain ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix misplaced spec citations in trailing parenthetical","tdd_next":"acceptance green"}}