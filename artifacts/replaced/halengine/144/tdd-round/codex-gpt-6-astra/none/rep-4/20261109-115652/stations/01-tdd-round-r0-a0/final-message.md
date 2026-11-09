The acceptance tests conflict with ticket #144: they require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is missing. The ticket requires `list_conversations`/`conversation_list`, opt-in, and `UNSUPPORTED` for missing capability.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. Red-test counts are unknown; no CI brief was present.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require protocol names, default disclosure, and missing-store behavior that contradict ticket #144; the contract needs reconciliation."}}