Resolved the CI reported failures from the previous push and completed the round:

- **Typecheck**: Fixed `PromptBuilder` configuration in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to use `identity: 'You are HAL.'` matching `PromptBuilderConfig`.
- **ESLint**: Addressed `re-lint/max-expects` in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` by asserting `{callerError, caughtError, afterSessionRan}` in a single `toEqual` call.
- **Changelog**: Added an entry under `## [Unreleased]` -> `### Fixed` in `CHANGELOG.md` documenting that `onError` and `afterSession` hooks now fire when `beforeSession` throws, along with the consumer migration note.
- **Spec traceability & formatting**: Re-verified spec citations in `specs/hal-engine-config-hooks/spec.md`, verified doc blocks and spec status gates, formatted touched files with Prettier, and confirmed branch alignment with `origin/main`. All facets in `.lore/dod.md` are marked complete.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document in the CHANGELOG what changes for an existing consumer","tdd_next":"acceptance green"}}