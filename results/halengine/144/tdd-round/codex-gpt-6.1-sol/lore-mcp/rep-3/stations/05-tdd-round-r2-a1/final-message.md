The acceptance tests conflict with ticket #144: they require `list_sessions` / `session_list` and an empty list when `listFor` is absent. The ticket requires `list_conversations` / `conversation_list` and `UNSUPPORTED` for that case.

Your instructions require stopping when an acceptance test is wrong. No files changed, tests run, or commits pushed. CI’s reported failures remain unresolved; its truncated output does not establish regression counts.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on protocol frame names and missing-listFor behavior; the contract needs reconciliation."}}