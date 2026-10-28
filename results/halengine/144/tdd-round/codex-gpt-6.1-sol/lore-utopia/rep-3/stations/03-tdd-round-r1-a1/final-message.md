The acceptance tests contradict ticket #144: they require `list_sessions`/`session_list` and an empty list when `listFor` is absent; the ticket requires `list_conversations`/`conversation_list` and `UNSUPPORTED`.

Your instructions require stopping when an acceptance test is wrong. No files changed, no tests ran, and nothing was committed or pushed. Red-test counts cannot be determined from the truncated CI verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict #144 on frame names and missing-listFor behavior; the authoritative contract must be resolved before implementation."}}