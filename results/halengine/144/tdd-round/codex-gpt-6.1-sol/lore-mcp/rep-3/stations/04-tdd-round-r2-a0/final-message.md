The acceptance tests conflict with the ticket: they require `list_sessions` / `session_list` and an empty list when `listFor` is absent; the ticket requires `list_conversations` / `conversation_list` and `UNSUPPORTED`.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, commits, or pushes. No new red tests; existing failures were not classified as regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance contract conflicts with ticket on frame names and missing-listFor behavior; reconcile before implementation."}}