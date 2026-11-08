I have fixed the CI failures for ticket #94.

### Changes Made:
- **Updated `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`**:
    - Fixed the `typecheck` error by updating the `PromptBuilder` configuration to use the current `identity` property instead of the deprecated `baseSystemPrompt` and `systemPromptSuffix`.
    - Fixed the `eslint` error (`re-lint/max-expects`) by combining the multiple `expect` calls into a single object-based assertion. This verifies the rejection, the `onError` hook execution, and the `afterSession` hook execution in one atomic check.
- **Verified the Fix**:
    - Ran the specific acceptance test locally using `npm test`, and it passed successfully.
    - Confirmed that the core logic in `src/orchestration/chatOrchestrator.ts` already correctly wraps the `beforeSession` hook inside the `try` block, ensuring that `onError` and `afterSession` fire as expected.
    - Verified that `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md` accurately reflect these new guarantees.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed typecheck and eslint errors in acceptance test by updating PromptBuilder config and combining assertions"}}