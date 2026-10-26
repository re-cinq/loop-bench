Repaired the two CI findings:

- Replaced nondeterministic `new Date()` in the acceptance fixture.
- Corrected the spec validation anchor.
- Updated `.lore/dod.md`.
- Focused test passed: `onErrorNonError.test.ts`.
- Committed and pushed; branch is up to date.
- No acceptance, lint, typecheck, or full-suite tests were run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"confirm existing Error-instance tests remain green without modification","tdd_next":"acceptance green"}}