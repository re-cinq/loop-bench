I have completed the TDD round for ticket #94.

### Research and Strategy
- Confirmed that `beforeSession` was being awaited outside the `try` block in `src/orchestration/chatOrchestrator.ts`, causing `onError` and `afterSession` hooks to be skipped if it threw.
- Identified the acceptance test `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and the relevant documentation in `specs/hal-engine-config-hooks/spec.md`.

### Implementation (TDD Loop)
- **Red:** Created a reproduction test `src/orchestration/beforeSession.repro.test.ts` and confirmed it failed (neither `onError` nor `afterSession` were called).
- **Green:** Moved the `beforeSession` hook call inside the `try` block in `src/orchestration/chatOrchestrator.ts`. Verified that the reproduction test now passes.
- **Refactor:** 
    - Moved the `beforeSession` guarantee from the "out of scope" section to the "Installing hooks through config" section in `specs/hal-engine-config-hooks/spec.md`.
    - Added a `### Fixed` entry to `CHANGELOG.md` under the `[Unreleased]` section.
    - Updated `.lore/dod.md` facets to mark them as complete.
    - Formatted changed files and updated spec anchor links.

### Final State
- The orchestrator now correctly handles errors thrown in `beforeSession` by routing them through the standard `onError` and `afterSession` lifecycle.
- Documentation and changelog are up-to-date with the new guarantee.
- All facets in `.lore/dod.md` are closed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"acceptance green"}}