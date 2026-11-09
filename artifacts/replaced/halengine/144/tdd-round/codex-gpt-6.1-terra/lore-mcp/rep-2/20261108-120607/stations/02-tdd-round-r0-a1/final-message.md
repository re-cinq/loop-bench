The acceptance test is wrong for the ticket’s stated contract. It expects `list_sessions` and `session_list`, while the ticket specifies `list_conversations` and `conversation_list`. It also expects an empty list when the store cannot list, where the ticket explicitly requires an `UNSUPPORTED` error.

I stopped without changing the test or implementation, as instructed. No tests were run, and no commit was made. CI’s verdict could not be read because Lore returned “branch not found,” so I cannot classify any CI failures as mine or regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test contradicts the ticket’s wire protocol and unsupported-store behavior"}}