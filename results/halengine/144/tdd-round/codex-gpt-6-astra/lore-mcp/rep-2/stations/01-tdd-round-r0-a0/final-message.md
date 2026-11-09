The acceptance tests contradict ticket #144: they require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is missing. The ticket requires `list_conversations`/`conversation_list`, history opt-in, and `UNSUPPORTED` for missing support.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. No commit or push. Red tests authored: 0; regressions: unverified.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict the ticket's frame names, history opt-in, and unsupported-store behavior; the acceptance contract needs correction."}}