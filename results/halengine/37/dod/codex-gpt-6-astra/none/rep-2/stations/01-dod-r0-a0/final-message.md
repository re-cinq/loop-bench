Committed and pushed `0bd32b4`. Branch is current with `main`; working tree is clean.

Four acceptance tests ran and failed:
```text
"invalidCalls": 3
Received function did not throw
Expected: > 0
Received:   0
Tests:       4 failed, 4 total
```

The full DoD remains blocked: the ticket requires a stub-provider retry test, while this task prohibits stubs. That missing coverage is recorded in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit a scripted provider for the required rejected-call/corrected-retry acceptance test, or identify a real tool-calling provider fixture runnable without mocks, stubs, or external credentials."}}