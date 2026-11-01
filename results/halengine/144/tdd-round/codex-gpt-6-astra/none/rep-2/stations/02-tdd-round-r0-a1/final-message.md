Blocked: the acceptance tests contradict ticket #144. They require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list`, history opt-in, and `UNSUPPORTED` for a missing `listFor`.

Following your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. No commit or push occurred. Red-test counts are unknown; no CI verdict was available.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests and dod.md contradict ticket #144 on frame names, history opt-in, and missing-listFor behavior; the authoritative contract needs correction."}}