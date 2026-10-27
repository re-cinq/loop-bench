Implemented and pushed commit `cc8b296`.

- `onError` now receives an `Error` wrapping non-Error rejections with `cause`.
- Original rejection still propagates unchanged.
- Added focused TDD test and updated traceability/DoD.
- Test: 1 red (new test), then green; 0 regressions observed.
- Acceptance suite, lint, typecheck, and build were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError","tdd_next":"confirm existing Error tests and add CHANGELOG entry"}}