The acceptance tests conflict with ticket #144: they require `list_sessions` / `session_list` and an empty list when `listFor` is absent. The ticket requires `list_conversations` / `conversation_list` and an `UNSUPPORTED` error.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, commits, or pushes. CI’s truncated test failure does not establish a regression count.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require different frame names and missing-store behavior from ticket #144; the acceptance contract must be reconciled."}}