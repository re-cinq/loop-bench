The acceptance tests contradict ticket #144: they require `list_sessions` / `session_list` and an empty list when `listFor` is missing; the ticket requires `list_conversations` / `conversation_list` and `UNSUPPORTED`.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. No commits were pushed. This round introduced 0 red tests and 0 regressions; the truncated CI brief does not establish previous regression counts.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require different frame names and missing-store behavior than ticket #144; the contract must be reconciled before implementation."}}