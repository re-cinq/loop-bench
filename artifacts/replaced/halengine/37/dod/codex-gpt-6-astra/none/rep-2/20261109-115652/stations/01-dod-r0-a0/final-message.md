Committed and pushed `91cd56f`: three direct acceptance tests, linked spec, and `.lore/dod.md`. Branch is current with `origin/main`; working tree is clean.

Actual failures:

```text
"missing": "forecast",
"rejectedCalls": 3,
"wrongEnum": "forecast",
"wrongType": "forecast"

Expected: > 0
Received:   0

"rejected": "forecast",
"restored": "forecast"

Tests:       3 failed, 3 total
```

The complete DoD remains blocked: the required orchestrator retry test explicitly needs a stub provider, conflicting with your prohibition on stubs. This outstanding requirement is recorded rather than omitted.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit a test-local provider for the required rejection-and-corrected-retry integration test, or provide a runnable real-provider fixture; the acceptance-test instructions currently prohibit the stub this criterion requires."}}