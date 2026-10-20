Implemented and pushed commit `bbb9f59`.

- Added/exported the explicit `TotalUsageMetadata` hook contract.
- Fixed all reported lint/changelog findings.
- Updated spec traceability and `.lore/dod.md`.
- Focused usage test passes.
- Branch is synchronized with `origin/loop-bench/93` and `origin/main`.
- Red tests: 0 authored, 0 regressions. The prior red verdict contained lint/changelog failures only.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Preserve the unchanged no-tool regression guard, `receives collected response text and usage`, in `src/orchestration/chatOrchestrator.test.ts`."}}