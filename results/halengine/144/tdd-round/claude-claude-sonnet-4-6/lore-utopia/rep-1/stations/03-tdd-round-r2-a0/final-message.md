This round fixed two CI failures and closed the last remaining DoD facet:

1. **ESLint failures** (6+ tests in `sessionResume.test.ts` and 3 in `conversationList.acceptance.test.ts` without spec links): The previous round extracted `eventually`/`delegatingTo`/`stopGracefully` to `wsTestSupport.ts`, which shifted all tests in those files up by 18 lines. All spec citations in `specs/hal-engine-session-resume/spec.md`, `specs/hal-engine-websocket-protocol/spec.md`, and `specs/hal-engine-conversation-list/spec.md` were updated with the corrected line numbers.

2. **spec-names failure**: Same root cause — citations pointed to wrong lines where different tests lived.

3. **Last DoD facet** (Document `list_sessions`/`session_list` in websocket-protocol spec): Added §4.3 `list_sessions` and §5.9 `session_list` with field tables, validation constraints, paging semantics, GDPR note, and test citations.

0 regressions caused; 0 tests written (all changes were spec documentation). No smells noticed that were left unfixed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md","tdd_next":"acceptance green"}}