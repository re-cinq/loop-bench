Stopped because the acceptance tests contradict ticket #144:

- They require `list_sessions` / `session_list`; the ticket requires `list_conversations` / `conversation_list`.
- They expect an empty list without `listFor`; the ticket requires `UNSUPPORTED`.
- They enable listing without the ticket’s required history opt-in.

Your instructions explicitly require stopping when an acceptance test is wrong. No files changed, no tests ran, and no commits were made. Red tests introduced: 0; regressions observed: 0.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on protocol names, missing-listFor behavior, and history opt-in; the acceptance contract must be corrected before implementation."}}