Committed and pushed `8a22fdd`: three direct acceptance tests, spec links, and `.lore/dod.md`. Branch is clean and synchronized with upstream.

Ran only `src/orchestration/tools/registry.acceptance.test.ts`. Actual failures include:

```text
- "callsAfterRejections": 0,
+ "callsAfterRejections": 4,
- "compiledAtRegistration": true,
+ "compiledAtRegistration": false,
- "resolutions": 4,
+ "resolutions": 0,
Tests:       3 failed, 3 total
```

Full acceptance remains blocked by conflicting requirements for the retry test.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Allow the scripted provider explicitly required by the ticket's retry acceptance criterion despite the no-stubs rule, or identify a real deterministic provider capable of issuing rejected and corrected tool calls."}}