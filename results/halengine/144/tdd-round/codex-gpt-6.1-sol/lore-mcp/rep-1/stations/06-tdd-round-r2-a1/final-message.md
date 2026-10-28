The acceptance tests conflict with ticket #144: they require `list_sessions` / `session_list` and an empty list when `listFor` is absent. The ticket requires `list_conversations` / `conversation_list`, opt-in history, and `UNSUPPORTED` when listing is unavailable.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, or commits pushed. CI reports three red acceptance tests and eight lint findings; no regressions were introduced this round.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, opt-in history, and unsupported-store behavior; reconcile the acceptance contract before implementation."}}