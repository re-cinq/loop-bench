I have fixed the CI failures in the `HALEngine` repository for ticket #94.

### Changes Made

- **`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`**:
    - Corrected the `PromptBuilder` initialization to use the `identity` property instead of the non-existent `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig` properties.
    - Resolved the ESLint `re-lint/max-expects` violation (max 1 expect call per test) by introducing the `outcomeOf` helper and combining multiple assertions into a single `expect(...).toEqual(...)` call.
- **`specs/hal-engine-config-hooks/spec.md`**:
    - Updated the line number for the validation link to the acceptance test to reflect the changes in the test file.

### Verification Results

- **Unit Tests**: Ran `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.test.ts` and all 24 tests passed.
- **Acceptance Test**: Ran `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` and it passed successfully.
- **Formatting**: Ran `npx prettier --write` on the modified files to ensure compliance with workspace standards.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed typecheck and eslint errors in beforeSession acceptance test"}}