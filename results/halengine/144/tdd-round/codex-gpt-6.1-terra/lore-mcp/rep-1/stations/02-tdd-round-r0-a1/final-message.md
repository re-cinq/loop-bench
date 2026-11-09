The acceptance tests conflict with ticket #144’s explicit authorization and error requirements. They expect listing without the `history` opt-in and an empty list when the store lacks `listFor`; the ticket requires `UNSUPPORTED` in both cases. They also use `list_sessions`/`session_list` instead of the specified `list_conversations`/`conversation_list`.

I stopped without changing the tests or code. This round ran no tests and produced no commit. The acceptance contract needs correction before the round can proceed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict the ticket's opt-in, unsupported-store, and protocol-frame requirements."}}