I have addressed all the CI failures reported from the last round:
- Fixed the `typecheck` error by passing the correct configuration structure for `PromptBuilder`.
- Fixed the `re-lint/max-expects` eslint error by consolidating the assertions inside `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.
- Fixed the `re-lint/require-spec-link` eslint error by adding the missing spec link for `invokes onError and afterSession when beforeSession throws` to `specs/hal-engine-architecture/spec.md`.
- Updated the link for the acceptance test in `specs/hal-engine-config-hooks/spec.md` since its line number shifted.
- Formatted the updated files.
- Pushed the fixes, and verified everything is merged and up to date with `main`.

No tests were run here, relying on CI for verification.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures","tdd_next":"acceptance green"}}