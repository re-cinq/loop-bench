Blocked: the acceptance tests contradict ticket #144. They require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is missing. The ticket requires `list_conversations`/`conversation_list`, explicit opt-in, and `UNSUPPORTED` for missing capability.

Per your instruction to stop when acceptance tests are wrong, I changed nothing. No tests ran; no new red tests or regressions were observed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict #144 on frame names, history opt-in, and missing-listFor behavior; the acceptance contract needs correction."}}