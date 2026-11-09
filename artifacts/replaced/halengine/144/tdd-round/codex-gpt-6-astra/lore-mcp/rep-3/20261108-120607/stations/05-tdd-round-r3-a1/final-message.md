Blocked: the acceptance tests contradict ticket #144. They require `list_sessions`/`session_list` and an empty list when `listFor` is missing; the ticket requires `list_conversations`/`conversation_list` and `UNSUPPORTED`.

Your instructions require stopping when acceptance tests are wrong. I changed nothing, ran no tests, and made no commit. No new red tests; regression count is unverified.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require frame names and missing-store behavior that contradict ticket #144; the acceptance contract needs reconciliation."}}