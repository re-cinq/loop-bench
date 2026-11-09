The acceptance test conflicts with the ticket: it requires `list_sessions` and an empty list when the store has no `listFor`, while the ticket requires `list_conversations` and an `UNSUPPORTED` error. The checklist repeats the conflicting behavior. Under your instruction to stop when an acceptance test is wrong, I made no changes and did not commit or push.

No tests ran locally. The truncated CI verdict does not identify how many red tests were newly written or regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require protocol names and missing-store behavior that contradict the ticket."}}