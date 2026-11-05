Blocked: the acceptance tests contradict #144. They require `list_sessions`/`session_list`, listing without opt-in, and an empty list when `listFor` is absent. The ticket requires `list_conversations`/`conversation_list`, opt-in history, and `UNSUPPORTED`.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, or commits pushed. CI lookup returned “branch not found”; red-test and regression counts are unknown.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on frame names, opt-in authorization, and missing-store behavior; the acceptance contract needs correction."}}