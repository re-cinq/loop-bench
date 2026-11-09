Blocked: the acceptance tests contradict ticket #144. They require `list_sessions`/`session_list`, default-enabled listing, and an empty list when `listFor` is absent; the ticket requires `list_conversations`/`conversation_list`, opt-in history, and `UNSUPPORTED`.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, or commits pushed. New red tests: 0; regressions: unknown without CI results.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, opt-in history, and missing-listFor behavior; reconcile the contract before implementation."}}