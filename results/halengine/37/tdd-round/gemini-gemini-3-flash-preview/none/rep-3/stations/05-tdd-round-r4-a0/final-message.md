I have fixed the CI failures and test regressions reported in the previous round.

Summary of changes:
1.  **Fixed ESLint errors:**
    *   In `src/orchestration/tools/registry.ts`, I removed unused imports (`Options`, `ErrorObject`), replaced `as any` with proper types, and flattened a nested `if` statement to satisfy `re-lint/no-nested-if`.
    *   In `src/orchestration/chatOrchestrator.test.ts`, I broke down long member chains to satisfy `re-lint/max-member-chain`.
2.  **Fixed Test Failures:**
    *   In `src/providers/providerFactory.test.ts`, I added a mock for `requireOptionalPeer` to prevent the real `VertexAI` and `BedrockRuntimeClient` from being instantiated during tests. This resolves failures in environments without cloud credentials and eliminates deprecation warnings.
    *   In `src/orchestration/chatOrchestrator.test.ts`, I updated the `returns a schema rejection as a tool_result...` test case to include the expected `toolUseId` in `tool_result` messages, which was causing a deep equality failure.
3.  **Verification:**
    *   Ran `src/orchestration/tools/registry.test.ts` (All 8 tests passed).
    *   Ran `src/orchestration/chatOrchestrator.test.ts` (All 23 tests passed).
    *   Ran `src/providers/providerFactory.test.ts` (All 5 tests passed).
    *   Ran `src/providers/vertex/vertexProvider.test.ts` (All 12 tests passed).

I have committed and pushed these fixes. Since all facets in `.lore/dod.md` were already marked as complete, the next step is for CI to verify the acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI regressions and test failures","tdd_next":"acceptance green"}}