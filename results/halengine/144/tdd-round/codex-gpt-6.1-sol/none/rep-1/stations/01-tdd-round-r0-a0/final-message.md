The acceptance tests conflict with ticket #144: they require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list`, explicit opt-in, and `UNSUPPORTED`.

Your instructions require stopping when acceptance tests are wrong. No files changed, no tests ran, and nothing was committed or pushed. Red-test counts are unverified.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, history opt-in, and missing-listFor behavior; the acceptance contract must be corrected."}}