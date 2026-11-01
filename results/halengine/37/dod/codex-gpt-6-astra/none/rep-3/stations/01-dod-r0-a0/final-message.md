Committed and pushed `5b913b6`: three registry acceptance tests, spec links, and `.lore/dod.md`. Branch is synchronized with upstream and `main`.

Actual failure output:

```text
- "calls": 0,
+ "calls": 1,
Received function did not throw
Tests:       3 failed, 3 total
```

The full contract remains blocked: the ticket requires a stub-provider retry test, while this task prohibits stubs.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit the ticket's requested stub-provider retry test or specify a real provider fixture that can exercise rejected input followed by a corrected retry without mocks or stubs."}}