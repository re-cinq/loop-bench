Completed facet: `Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession.`.

### Summary of Changes
- Updated `specs/hal-engine-config-hooks/spec.md`:
  - Added the normative guarantee under `## Installing hooks through config` specifying that when `beforeSession` throws, `onError` and `afterSession` still fire, the error propagates to the caller, and `afterSession` can assume no entries beyond the initial user message were processed, citing `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts#L40`.
  - Removed the recorded flaw bullet from `## Measured semantics — out of scope` and updated the introductory sentence to reference two properties rather than three.
- Updated `.lore/dod.md` to check off the completed facet.
- Verified spec link placement, spec status, and spec anchor names (`npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`).
- Formatted changed files with Prettier.
- Committed and pushed `16488d0` to `origin/loop-bench/94`; verified branch is up to date with `origin/main`.

### Test Verdict and Regressions
- The round ran no tests here (documentation/specification update facet).
- 0 red tests were ours, and there were 0 regressions.

### Unrelated Smells Noticed
- In `specs/hal-engine-config-hooks/spec.md`, the remaining out-of-scope flaws (`instanceof Error` gate on `onError`, and single-round `lastUsage` in `afterModelResponse`) remain out of scope for issue #94. Acted on none of them.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession.","tdd_next":"Document in the CHANGELOG what changes for an existing consumer."}}