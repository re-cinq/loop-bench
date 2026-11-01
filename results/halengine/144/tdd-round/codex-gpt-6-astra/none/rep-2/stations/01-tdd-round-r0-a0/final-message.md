Blocked: the acceptance tests contradict #144: they require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is missing. The ticket requires `list_conversations`/`conversation_list`, opt-in, and `UNSUPPORTED`.

Per your instruction, I left the acceptance tests unchanged and stopped. No files changed, tests run, or commits pushed. New red tests: 0; regressions: unverified.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, opt-in, and missing-listFor behavior; reconcile the contract before implementation."}}