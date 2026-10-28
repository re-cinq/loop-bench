The acceptance tests conflict with ticket #144: they require `list_sessions`/`session_list` and an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list` and an `UNSUPPORTED` error.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, commits, or pushes. CI reports eslint failures and a truncated test failure; the excerpt cannot establish red-test or regression counts.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on protocol frame names and missing-store behavior; acceptance contract needs reconciliation."}}