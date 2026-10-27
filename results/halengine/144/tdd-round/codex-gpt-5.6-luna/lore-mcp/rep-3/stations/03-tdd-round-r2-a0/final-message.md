Implemented one red-green-refactor round:

- Added and passed the `list_sessions` maximum-limit test (1–200).
- Refactored validation dispatch.
- Reanchored stale spec links, fixing prior CI failures.
- Updated `.lore/dod.md`.
- Commit pushed: `eca2586`
- Branch is synchronized with upstream.
- Tests run: only `src/transport/ws/validation.test.ts`; no acceptance suite run.
- Red tests: 1 authored, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"enforce list_sessions page limit and repair CI trace links","tdd_next":"acceptance green"}}