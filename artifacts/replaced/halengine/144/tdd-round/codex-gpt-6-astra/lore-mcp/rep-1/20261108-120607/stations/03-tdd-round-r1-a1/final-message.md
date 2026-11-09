The acceptance tests conflict with ticket #144: they require `list_sessions`/`session_list` and an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list` and an `UNSUPPORTED` error in that case.

Per your instruction to stop when acceptance tests are wrong, I made no edits, ran no tests, and pushed nothing. Red-test and regression counts cannot be determined from the truncated CI verdict.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require different protocol frames and missing-store behavior from ticket #144; reconcile the acceptance contract before implementation."}}