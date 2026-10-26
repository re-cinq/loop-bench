Pushed and up to date.

**What was done:** Moved `hooks.beforeSession()` from before the `try` block into it, so a throw now reaches the same `catch` (triggering `onError`) and `finally` (triggering `afterSession`) as any other orchestrator failure. Both facets ticked: code fix + spec guarantee documented. 24 unit tests pass; 0 regressions. CHANGELOG and spec updated. No unrelated smells touched (noted: the `instanceof Error` gate on `onError` at line 150 remains a known measured-semantic out of scope per the ticket).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession into the protected lifecycle so its failure reaches onError and afterSession","tdd_next":"acceptance green"}}