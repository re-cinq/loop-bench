The acceptance tests contradict ticket #144: they require `list_sessions`/`session_list` and an empty list for unsupported stores, while the ticket requires `list_conversations`/`conversation_list` and `UNSUPPORTED`.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, commits, or pushes. No tests authored; the truncated CI report prevents a reliable regression count.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names and unsupported-store behavior; the authoritative contract must be resolved."}}