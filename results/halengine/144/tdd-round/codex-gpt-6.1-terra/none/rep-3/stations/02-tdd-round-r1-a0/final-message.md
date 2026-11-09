The acceptance tests conflict with the ticket: they require `list_sessions`/`session_list` and an empty list when the store lacks `listFor`; the ticket requires `list_conversations`/`conversation_list` and an `UNSUPPORTED` error. Following the instruction to stop when an acceptance test is wrong, I made no changes and ran no tests.

The CI brief is also truncated, so it does not identify enough failures to count red tests as ours versus regressions. The named `tdd-loop` skill and Lore graph tools were unavailable in this environment.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict the ticket's protocol and unsupported-store behavior."}}