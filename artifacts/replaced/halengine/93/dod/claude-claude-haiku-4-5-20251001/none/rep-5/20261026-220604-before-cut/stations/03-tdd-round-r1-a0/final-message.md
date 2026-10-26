Branch is pushed and up to date. Here's what this round delivered:

**Fixed all CI failures from the previous push:**

1. **`re-lint/no-duplicate-code` (3 errors fixed)**:
   - Extracted `scriptedProvider`, `registryReturning`, `TOOL_CALL`, `STOP_FOR_TOOL`, `STOP_DONE` into `src/orchestration/chatOrchestratorTestSupport.ts`, eliminating the 28-line cross-file duplicate between `chatOrchestrator.test.ts` and `chatOrchestrator.acceptance.test.ts`
   - Added `captureUsage()` and `makeToolOrchestrator()` helpers to the acceptance test, collapsing the within-file duplicate `let receivedUsage / const hooks / createChatOrchestrator(scriptedProvider([...` patterns (13-line and 11-line duplicates)
   - Added new test support file to `tsconfig.build.json` exclude list

2. **`re-lint/require-spec-link` (3 errors fixed + preemptive coverage for 2 more that were likely truncated)**:
   - Added validated-by links to `specs/hal-engine-config-hooks/spec.md` for all 5 acceptance tests (lines L39, L59, L79, L98, L119) and the `sumUsage` helper test (L29 in orchestratorHelpers.test.ts)
   - Updated the existing `#L49` link to the correct `#L39` after line shifts

3. **`re-lint/max-comment-lines` (1 error fixed)**: The two-line `// no usage` consecutive comment was eliminated by refactoring the test into `makeToolOrchestrator`

4. **Prettier**: Ran on all changed `.ts` files before committing

Unresolved smells noticed (not acted on): The "Measured semantics — out of scope" section header in the spec is stale — ticket #93 did change one of those properties. The section body and header disagree slightly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI lint failures: duplicate code, missing spec links, multi-line comment","tdd_next":"acceptance green"}}