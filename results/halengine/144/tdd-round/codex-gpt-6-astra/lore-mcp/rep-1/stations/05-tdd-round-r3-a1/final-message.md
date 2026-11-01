Stopped because the acceptance tests contradict ticket #144:

- They require `list_sessions` / `session_list`, rather than `list_conversations` / `conversation_list`.
- They expect an empty list when `listFor` is missing; the ticket explicitly requires `UNSUPPORTED`.
- They expect history without enabling the required opt-in.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, or commits pushed. This round introduced 0 red tests; no regressions were established.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests and dod.md contradict ticket #144 on frame names, mandatory history opt-in, and missing-store error behavior; the acceptance contract needs correction."}}