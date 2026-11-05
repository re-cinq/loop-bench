Blocked before editing: the acceptance tests contradict ticket #144. They require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list`, history opt-in, and `UNSUPPORTED` for unavailable listing.

Under your instruction to stop when acceptance tests are wrong, I left them unchanged. No tests ran, no commits were made, and no regressions were observed. Lore could not retrieve CI results: branch not found.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests and dod require protocol names, opt-in behavior, and missing-store responses that contradict ticket #144; reconcile the acceptance contract before implementation."}}