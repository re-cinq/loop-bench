Stopped because the acceptance tests contradict #144: they require `list_sessions`/`session_list` and an empty list when `listFor` is missing; the ticket requires `list_conversations`/`conversation_list` and `UNSUPPORTED`.

Your instructions require stopping when acceptance tests are wrong. No files changed, no tests run, no commit pushed. New red tests: 0; regressions: unassessed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict #144 on protocol frame names and missing-listFor behavior; the acceptance contract needs correction."}}