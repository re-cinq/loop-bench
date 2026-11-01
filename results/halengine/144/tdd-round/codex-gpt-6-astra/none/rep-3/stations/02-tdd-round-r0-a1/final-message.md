Stopped because the acceptance tests contradict ticket #144:

- They require `list_sessions` / `session_list`, instead of `list_conversations` / `conversation_list`.
- They expect listing without the required history opt-in.
- They require an empty list when `listFor` is absent; the ticket explicitly requires `UNSUPPORTED`.

Your instructions require stopping when acceptance tests are wrong. No files changed, no tests run, no commits pushed. Red-test counts are unknown; no CI verdict was available.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require protocol names, default disclosure, and missing-store behavior that contradict ticket #144; acceptance contract needs correction."}}