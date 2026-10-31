Implemented and pushed the list-session failure path.

- Added a red/green unit test for failed `listFor`, including generic client error and `ws` log context.
- Fixed the existing SessionStore test cast CI finding.
- Reanchored the CI-reported spec citations.
- Focused test passed; 1 red test was mine, 0 regressions.
- Branch is pushed and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions errors and logging in messageHandler","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}