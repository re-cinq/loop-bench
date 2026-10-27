Implemented and pushed commit `5569fa6` (`feat(transport): validate list_sessions frames`). The added test failed on the unknown frame, then passed after validation was added. **Red tests: 1 authored; 0 regressions observed.** No acceptance tests were run.

The next facet is to finish the message types and exports. The ticket describes `list_conversations`/`conversation_list`, while this branch’s DoD and acceptance tests describe `list_sessions`/`session_list`; I followed the branch DoD for this round. Lore could not provide CI failures because it had no record of this branch.

The branch is clean and up to date with its upstream. No unrelated code issues were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Complete message types, outgoing union, and exports"}}