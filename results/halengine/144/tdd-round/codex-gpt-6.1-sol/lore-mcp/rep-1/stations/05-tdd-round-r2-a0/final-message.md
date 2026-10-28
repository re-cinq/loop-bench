The acceptance tests conflict with the ticket: they require `list_sessions`/`session_list`, allow `limit: 0`, and expect an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list`, limits 1–200, and `UNSUPPORTED` for missing capability.

Your instructions require stopping when acceptance tests are wrong. No files changed, no tests ran, and nothing was committed or pushed. This round introduced 0 red tests and 0 regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests and dod.md contradict ticket #144 on frame names, limit validation, and missing-store behavior; the authoritative contract must be resolved."}}