### Summary of Changes

1. **Fixed Acceptance Test**:
   - Corrected `PromptBuilder` configuration in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` to adhere to `PromptBuilderConfig` (`identity: 'You are HAL.'`).
   - Consolidated assertions using `outcomeOf` into a single `expect(...).toEqual(...)` to satisfy the `re-lint/max-expects` ESLint rule.
2. **Updated Spec Anchor**:
   - Repointed the citation anchor in `specs/hal-engine-config-hooks/spec.md` to match the updated line number (`#L35`) of the acceptance test declaration.
3. **Documented in CHANGELOG**:
   - Added an entry under `## [Unreleased]` -> `### Changed` explaining the new behavior when `beforeSession` throws or rejects, the guarantees around `onError` and `afterSession`, and what cleanup hooks can assume about session state.
4. **Updated Definition of Done**:
   - Marked the facet `Document in the CHANGELOG what changes for an existing consumer.` as complete in `.lore/dod.md`.
5. **Formatted, Committed, and Pushed**:
   - Formatted all changed files with Prettier.
   - Verified `scripts/check-changelog.sh`, `scripts/check-spec-anchor-names.mjs`, and `scripts/check-spec-links.mjs` pass.
   - Committed the changes and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document in the CHANGELOG what changes for an existing consumer.","tdd_next":"acceptance green"}}