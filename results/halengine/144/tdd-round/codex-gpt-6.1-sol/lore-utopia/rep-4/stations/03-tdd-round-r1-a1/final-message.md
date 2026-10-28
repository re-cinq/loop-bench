The acceptance tests contradict ticket #144: they require `list_sessions`/`session_list` and an empty list when `listFor` is unavailable. The ticket requires `list_conversations`/`conversation_list` and an `UNSUPPORTED` error.

Per your instruction to stop when acceptance tests are wrong, I changed nothing, ran no tests, and made no commit or push. The brief reports three failing acceptance tests; its truncated log does not establish a regression count.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require different protocol names and missing-store behavior from ticket #144; reconcile the acceptance contract before implementation."}}