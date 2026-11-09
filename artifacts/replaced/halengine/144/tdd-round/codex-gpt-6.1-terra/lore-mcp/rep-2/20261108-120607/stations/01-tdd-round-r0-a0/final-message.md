The acceptance test is wrong for ticket #144, so I stopped without editing it or the implementation. It requires `list_sessions` and `session_list` with history enabled implicitly, and an empty list when the store cannot list. The ticket requires `list_conversations` and `conversation_list`, an explicit history opt-in, and an `UNSUPPORTED` error in that case.

No tests ran locally: 0 red tests were mine, and 0 regressions were identified. Lore could not retrieve a CI verdict because it reported the branch was not found. The acceptance contract needs correction before a round can proceed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, history opt-in, and unsupported-store behavior."}}