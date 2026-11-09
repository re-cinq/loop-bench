The acceptance test conflicts with the ticket’s explicit requirements. It expects `list_sessions` / `session_list`, permits listing without an opt-in, and expects an empty list when the store cannot list. The ticket requires `list_conversations` / `conversation_list`, history disabled by default, and an `UNSUPPORTED` error when `listFor` is absent.

Because the acceptance test is wrong under the ticket’s contract, I stopped without editing it or changing code. No tests were run, and no commit was made. Red tests: 0 written this round; 0 identified as regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict the ticket's required protocol names, opt-in, and unsupported-store behavior."}}