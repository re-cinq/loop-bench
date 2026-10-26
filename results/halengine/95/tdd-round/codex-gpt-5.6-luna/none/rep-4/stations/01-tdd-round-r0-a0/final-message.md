Implemented and pushed one TDD round.

- Added non-`Error` rejection wrapping with preserved `cause`.
- Added focused regression test; it passed after refactor.
- Updated `.lore/dod.md` and `CHANGELOG.md`.
- Commit: `6e6dceb`
- Branch merged with `origin/main` and is up to date.
- Acceptance tests were not run per instructions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections for onError and document the consumer-visible change","tdd_next":"confirm existing Error-instance tests and acceptance green"}}