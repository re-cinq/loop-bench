Implemented and pushed `9146819`.

- Added authenticated `list_sessions` dispatch, ISO serialization, error handling, and server wiring.
- Fixed validator type narrowing from prior CI.
- Added/ran the focused handler test: 55 passing.
- Did not run acceptance tests, lint, or typecheck locally.
- Red tests: 1 authored during TDD; 0 regressions identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and handle list_sessions over the WebSocket","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}