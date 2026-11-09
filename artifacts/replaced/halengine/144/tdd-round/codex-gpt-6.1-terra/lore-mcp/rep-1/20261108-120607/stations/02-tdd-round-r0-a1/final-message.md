The acceptance test conflicts with ticket #144, so I stopped without changing or running tests. It requires `list_sessions`/`session_list` and an empty list when the store cannot list; the ticket requires `list_conversations`/`conversation_list` and an `UNSUPPORTED` error. The test must be corrected before a valid round can proceed.

CI’s verdict was unavailable: Lore reported that the branch was not found. No red tests were run locally: 0 mine, 0 identified regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test requires protocol frames and unsupported-store behavior that contradict ticket #144."}}