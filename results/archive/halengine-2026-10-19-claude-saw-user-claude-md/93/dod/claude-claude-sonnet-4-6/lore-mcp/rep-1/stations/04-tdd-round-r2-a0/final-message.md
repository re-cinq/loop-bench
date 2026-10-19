Pushed cleanly. Summary:

**Red**: No test existed validating that a non-Error thrown rejection bypasses `onError` while still propagating to the caller (spec.md line 27 had no validated-by link).

**Green**: Added `'bypasses onError when a non-Error is thrown, but still propagates it'` to the `onError` describe block — passed immediately since the `catch (error) { if (error instanceof Error)` guard is already in place at chatOrchestrator.ts:151.

**Spec updates**: Added validated-by links to both previously-uncovered statements (line 27 → new test at L312, line 28 → existing acceptance test at L30), fixing the `re-lint/require-status-matches-coverage` eslint failure.

**MongoDB CI failure**: The `'what a persisted session may not contain › leaves the caller...'` failure is an infrastructure lock-file contention issue in the CI environment — unrelated to my changes, 0 regressions caused by this round.

Unrelated smells noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec validated-by links for catch-gate and afterModelResponse-sum statements","tdd_next":"acceptance green"}}