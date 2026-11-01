Stopped because the acceptance tests contradict ticket #144: they require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list`, explicit opt-in, and `UNSUPPORTED` for missing capability.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. Red-test and regression counts are unknown; no CI verdict was available.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests and dod require a protocol and fallback behavior incompatible with ticket #144; reconcile the contract before implementation."}}