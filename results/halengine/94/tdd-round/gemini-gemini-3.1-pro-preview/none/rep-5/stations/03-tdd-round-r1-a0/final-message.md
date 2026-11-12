I have fixed the CI failures listed in the round brief. 

- Fixed the `PromptBuilderConfig` type mismatch and the `max-expects` lint error in the acceptance test (`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`).
- Removed the duplicate `triggers onError and afterSession when it throws` test from `src/orchestration/chatOrchestrator.test.ts` that lacked a spec link (the acceptance test already covers this scenario).
- Ran the spec anchor name check script (`scripts/check-spec-anchor-names.mjs`) to fix all the misaligned `#L` anchors shifted by the 17-line deletion in `chatOrchestrator.test.ts` across `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md`.
- Formatted the touched files, committed the work, and merged `origin/main` successfully.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}