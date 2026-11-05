Stopped because the acceptance contract contradicts ticket #144:

- Tests require `list_sessions` / `session_list`; the ticket requires `list_conversations` / `conversation_list`.
- Tests require an empty list when `listFor` is missing; the ticket explicitly requires `UNSUPPORTED`.
- Tests enable listing without the required history opt-in.

Your instructions prohibit correcting wrong acceptance tests and require stopping in this case. No files changed, tests run, commits, or pushes. This round introduced 0 red tests and 0 regressions; prior CI failures remain unresolved.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests and dod.md contradict ticket #144 on frame names, history opt-in, and missing-listFor behavior; the acceptance contract needs correction."}}