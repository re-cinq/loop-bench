Implemented, committed (`4d9294b`), and pushed conversation-list handling.

- Added authenticated-user store lookup, pagination forwarding, ISO date serialization, empty fallback, error logging, and server wiring.
- Repaired both prior CI lint findings.
- New test: red then green; final file run passed 55/55.
- Red tests: 1 written this round; regressions: 0.
- Branch is synchronized with `origin/main` and upstream.
- Next facet: protocol and conversation-list documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore through createServer and handle list_sessions","tdd_next":"document list_sessions and session_list in both protocol specs"}}