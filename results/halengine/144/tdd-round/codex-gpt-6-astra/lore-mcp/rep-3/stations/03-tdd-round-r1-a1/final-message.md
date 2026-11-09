The acceptance tests conflict with ticket #144: they require `list_sessions` / `session_list` and an empty list when `listFor` is missing. The ticket requires `list_conversations` / `conversation_list` and an `UNSUPPORTED` error.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. No commit or push occurred. New red tests: 0; regression count unavailable from the truncated CI verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require different frame names and missing-store behavior than ticket #144; reconcile the acceptance contract before implementation."}}