Blocked by conflicting requirements: the ticket requires a stub-provider retry test, while your rules prohibit stubs.

Provisional registry tests confirmed the missing behavior:

```text
-   "invalidExecutions": 0,
+   "invalidExecutions": 4,
Tests:       3 failed, 3 total
```

I removed the provisional files; nothing was committed. Please permit the scripted provider or separate that criterion.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Permit a scripted provider for the required orchestrator retry acceptance test, or separate that criterion; the current no-stubs rule prohibits its required fixture."}}