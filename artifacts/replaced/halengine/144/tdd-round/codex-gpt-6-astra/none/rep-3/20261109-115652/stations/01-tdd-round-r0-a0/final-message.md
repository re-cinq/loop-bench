Blocked: the acceptance tests contradict ticket #144:

- Require `list_sessions` / `session_list` instead of `list_conversations` / `conversation_list`.
- Expect history without opt-in.
- Require an empty list when `listFor` is missing; the ticket explicitly requires `UNSUPPORTED`.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. No commit or push. Red-test counts are unverified: no round brief or Lore CI tool was available.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, history opt-in, and missing-listFor behavior; the acceptance contract needs correction or explicit reconciliation."}}