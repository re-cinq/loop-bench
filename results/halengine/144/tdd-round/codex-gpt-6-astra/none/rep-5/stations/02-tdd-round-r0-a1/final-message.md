Blocked: the acceptance tests contradict ticket #144. They require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is missing. The ticket requires `list_conversations`/`conversation_list`, opt-in history, and `UNSUPPORTED` for a missing `listFor`.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. No commit or push. New red tests: 0; regressions observed: 0 (CI verdict unavailable).

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, history opt-in, and missing-listFor behavior; the acceptance contract needs correction."}}