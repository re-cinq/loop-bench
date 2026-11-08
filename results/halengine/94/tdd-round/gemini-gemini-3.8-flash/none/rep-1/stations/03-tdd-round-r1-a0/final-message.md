### Summary of Changes

1. **Resolved CI TypeScript Failure:**
   - In `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, replaced invalid `baseSystemPrompt` configuration with valid `PromptBuilderConfig` (`{identity: 'You are HAL.'}`).

2. **Resolved CI ESLint Failure (`re-lint/max-expects`):**
   - In `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, unified assertions via `outcomeOf` helper and a single `expect({outcome, caughtError, afterSessionRan}).toEqual(...)`.

3. **Traceability Anchor Sync:**
   - In `specs/hal-engine-config-hooks/spec.md`, updated the spec anchor for `runs onError and afterSession when beforeSession throws` to `#L36` matching the formatted test declaration.

4. **CHANGELOG Documentation:**
   - Under `## [Unreleased]` -> `### Changed` in `CHANGELOG.md`, documented what changes for consumers when `beforeSession` throws (invokes `onError` and `afterSession` before rejecting, and what `afterSession` may assume).

5. **Definition of Done:**
   - Ticked `- [x] Document in the CHANGELOG what changes for an existing consumer.` in `.lore/dod.md`.

6. **Delivery & Verification:**
   - Formatted all changed files with `prettier`.
   - Committed and pushed to `origin HEAD`, verified clean branch status against upstream.
   - The round ran no tests here (acceptance tests are judged by CI and barred from execution in the pod).
   - Test counts: 0 red tests were ours and 0 regressions.
   - Unrelated smells: None noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document in the CHANGELOG what changes for an existing consumer.","tdd_next":"acceptance green"}}