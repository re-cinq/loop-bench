Committed and pushed `f5842f5`, closing the `list_sessions` validation facet. The new test passed after the change. One test written this round was red; no regressions were reported. I did not run the acceptance tests.

The branch checklist and acceptance tests specify `list_sessions` and an empty-list fallback, while ticket #144 specifies `list_conversations` and an unsupported error. That contract conflict remains unresolved. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames and strip untrusted fields","tdd_next":"Add and export the conversation list protocol types"}}