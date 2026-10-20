I have completed the TDD round for ticket #95.

### Accomplishments
- **Modified `src/orchestration/chatOrchestrator.ts`**: Updated the `catch` block in `processMessageStream` to coerce non-`Error` rejections (like strings or plain objects) into `Error` instances, preserving the original value as the `cause`. This ensures that `hooks.onError` is always called for any rejection within the turn.
- **Verification**:
    - Created and ran a new test case `src/orchestration/onErrorNonError.round.test.ts` which confirmed that `onError` was previously skipped for string rejections and is now called with the expected coerced `Error`.
    - Ran the existing 26 tests in `src/orchestration/chatOrchestrator.test.ts` using Jest to ensure no regressions were introduced to the core orchestration logic.
- **Traceability & Documentation**:
    - Updated `specs/hal-engine-config-hooks/spec.md` with corrected line numbers for the acceptance test links, ensuring accurate traceability.
    - Added a new entry to `CHANGELOG.md` under `## [Unreleased]` describing the behavior change.
- **Process**:
    - Ticked all facets in `.lore/dod.md`.
    - Formatted modified files with Prettier.
    - Committed and pushed the changes to the branch.
    - Merged `origin/main` to ensure the branch is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerced non-Error rejections to Error and called onError","tdd_next":"acceptance green"}}