Implemented and pushed one TDD round:

- Closed validation facet for `list_sessions`.
- Added paging-field validation and unknown-field stripping.
- Added and linked one focused unit test.
- Test passed: `src/transport/ws/validation.test.ts`.
- Red tests: 1 authored, 0 regressions.
- Commit: `278e834`; branch synchronized with upstream.

Next facet: complete and publicly export the protocol message types.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames and strip unknown fields","tdd_next":"Add and export ListSessionsMessage, SessionSummaryFrame, and SessionListMessage"}}