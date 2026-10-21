I have fixed the lint errors in `src/orchestration/tools/registry.ts` and `src/orchestration/tools/registry.test.ts` that were causing the CI build to fail.

Specifically:
- In `src/orchestration/tools/registry.ts`, I replaced `any` types with appropriate `Ajv` and `ErrorObject` types and removed the unused `as any` cast in the constructor.
- In `src/orchestration/tools/registry.test.ts`, I refactored the last test to move assertions closer to their respective calls, satisfying the `re-lint/declare-near-use` rule. I also broke down a deep member chain (`spy.mock.calls.length`) to satisfy the `re-lint/max-member-chain` rule.

I verified that `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` pass locally in this environment. All 7 tests in `registry.test.ts` and 23 tests in `chatOrchestrator.test.ts` passed.

I checked the spec links in `specs/hal-engine-tool-input-validation/spec.md` and confirmed that the line numbers remain accurate (the last test still starts on line 129).

I have committed the changes, merged `origin/main` (which was already up to date), and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed lint errors and verified unit tests","tdd_next":"acceptance green"}}