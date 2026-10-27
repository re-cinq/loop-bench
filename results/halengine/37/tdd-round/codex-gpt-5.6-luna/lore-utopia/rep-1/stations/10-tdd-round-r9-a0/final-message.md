Implemented and pushed commit `6b2af71`.

- Added enum constraint rejection coverage and message.
- Fixed CI-reported traceability and assertion issues.
- Updated `.lore/dod.md` and spec links.
- Ran only the new focused test; it passed after the fix.
- No acceptance tests, lint, typecheck, or build run.
- Branch is up to date with upstream.

One red test was ours; no regressions observed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"enum rejection messages name the failed constraint","tdd_next":"remaining registry/orchestrator tests and documentation updates"}}