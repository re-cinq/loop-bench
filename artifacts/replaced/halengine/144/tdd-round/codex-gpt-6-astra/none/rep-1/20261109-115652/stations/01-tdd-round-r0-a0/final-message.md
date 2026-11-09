The acceptance tests conflict with #144: they require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is missing. The ticket requires `list_conversations`/`conversation_list`, default-off history, and `UNSUPPORTED` for missing `listFor`.

Per your instruction to stop when acceptance tests are wrong, I made no changes and ran no tests. No new red tests; regressions were not assessed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, required history opt-in, and missing-listFor behavior; the acceptance contract needs reconciliation."}}