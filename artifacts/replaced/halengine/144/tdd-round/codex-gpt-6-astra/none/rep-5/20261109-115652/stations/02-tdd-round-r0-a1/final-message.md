The acceptance tests contradict the ticket: they require `list_sessions`/`session_list`, enable listing without opt-in, and return an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list`, default-off history, and `UNSUPPORTED` for missing `listFor`.

Following your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. New red tests: 0; regressions observed: 0. The acceptance contract needs correction before implementation.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, history opt-in, and missing-listFor behavior; the acceptance contract needs correction."}}