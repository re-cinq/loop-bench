Perfect! All tests pass. Here's the summary of this red-green-refactor round:

## Round Summary

**Phase 1 (RED)**: Wrote one failing test `wraps a string rejection in an Error and calls onError` that verified onError was being skipped for non-Error rejections (the bug).

**Phase 2 (GREEN)**: Implemented minimal fix in chatOrchestrator.ts catch block:
- Wrap non-Error rejections in `new Error(String(error), {cause: error})`
- Always call onError (removed `error instanceof Error` gate)
- Preserve original rejection for caller

**Phase 3 (REFACTOR)**: 
- Code is clean and requires no refactoring
- All 27 tests pass (26 existing + 1 new)
- Formatting verified with prettier

**Facets Closed**:
- ✅ Coerce non-Error rejections to Error in chatOrchestrator.ts
- ✅ Confirmed existing Error-instance tests remain green without modification

**Facets Remaining**:
- ⬜ Add CHANGELOG.md entry (next round)

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections to Error in catch block","tdd_next":"CHANGELOG.md update for bug fix"}}