Blocked: the acceptance tests contradict ticket #144. They require `list_sessions`/`session_list` and an empty list when `listFor` is absent; the ticket requires `list_conversations`/`conversation_list` and `UNSUPPORTED`. Your instructions require stopping when acceptance tests are wrong.

No files changed, tests run, or commits pushed. I introduced 0 red tests; regression count is unverified.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on protocol frame names and missing-listFor behavior; the acceptance contract needs correction."}}