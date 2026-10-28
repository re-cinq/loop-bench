Closed the 1–200 `list_sessions` limit facet and repaired the two session-resume spec links reported by CI. The focused validation test failed before the change and passed afterward (5 tests). No acceptance tests were run.

Committed and pushed `aed6893`; the branch is up to date with its upstream, and `origin/main` had no newer changes. The CI test failure details weren’t available because the brief was truncated and Lore couldn’t find the branch. Red tests written this round: 1; regressions identified: 0.

The remaining ticket facets are recorded unchecked in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Enforce list_sessions limit bounds of 1–200","tdd_next":"Use the ticket’s list_conversations/conversation_list wire contract and implement history opt-in/error behavior, then finish the documented config and docs requirements"}}