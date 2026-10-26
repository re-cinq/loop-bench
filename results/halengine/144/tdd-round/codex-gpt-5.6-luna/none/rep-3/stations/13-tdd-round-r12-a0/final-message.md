Completed and pushed one red-green-refactor round.

- Added regression for invalid conversation-list results.
- Removed empty-list fallback; returns sanitized `SERVER_ERROR`.
- Fixed CI-reported declaration-order lint issue.
- Updated spec trace and DoD.
- Test: 1 authored failure, then green; 0 regressions.
- Branch synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid conversation-list results","tdd_next":"acceptance green"}}