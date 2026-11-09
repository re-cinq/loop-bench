The acceptance tests conflict with the ticket, so I stopped without changing or running them. They require `list_sessions` and `session_list`, enable listing without the required history opt-in, and expect an empty list when the store cannot list. The ticket specifies `list_conversations` and `conversation_list` and requires an `UNSUPPORTED` error in that case.

Lore could not retrieve the branch’s CI verdict: it returned “branch not found.” I wrote no tests, so there were 0 red tests from this round; the number of CI regressions is unknown. No unrelated issues were acted on.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict the ticket's frame names, opt-in requirement, and unsupported-store behavior."}}