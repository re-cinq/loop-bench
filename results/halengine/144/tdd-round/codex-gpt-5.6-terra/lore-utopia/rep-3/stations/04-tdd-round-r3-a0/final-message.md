Committed and pushed `71be2d2`.

- Added rejection for numeric cursor dates outside JS’s valid date range.
- Consolidated duplicate socket-test lifecycle helpers and repaired spec anchors/citation.
- Ran: `src/transport/ws/validation.test.ts` — 4 passed.
- Red tests: 1 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject unrepresentable numeric list_sessions cursor dates and remove CI-reported duplicated socket-test setup","tdd_next":"acceptance green"}}