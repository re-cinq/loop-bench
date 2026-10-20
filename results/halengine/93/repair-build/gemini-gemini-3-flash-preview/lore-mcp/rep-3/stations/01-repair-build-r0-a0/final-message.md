I have fixed the ESLint errors and addressed the requirement to make the `afterModelResponse` hook signature unambiguous.

### Changes:
- **ESLint Fixes:** Resolved missing spec link errors in `src/orchestration/orchestratorHelpers.test.ts` by adding them to `specs/hal-engine-config-hooks/spec.md`. I also combined multiple assertions into a single `expect` call in the unit tests to comply with the `re-lint/max-expects` rule.
- **API Clarification:** Renamed the `usage` parameter to `combinedUsage` in the `afterModelResponse` hook signature within `src/orchestration/chatOrchestrator.ts`. This clearly signals to consumers that the reported metadata is an aggregate of all tool rounds, as implemented in the orchestrator's loop.
- **Consistency Updates:**
    - Renamed the internal `lastUsage` variable to `combinedUsage` in `chatOrchestrator.ts`.
    - Updated all implementations of the hook in the test suite (`acceptance.test.ts`, `chatOrchestrator.test.ts`, `toolBudget.test.ts`) to use the new parameter name.
    - Updated project documentation (`README.md`, `docs/getting-started.md`, `example/server.ts`, `example/full-config.ts`) and architectural specifications (`specs/hal-engine-architecture/spec.md`, `specs/hal-engine-tool-budget/spec.md`, `CLAUDE.md`) to reflect the name change and the aggregated usage behavior.
- **Verification:** Ran `npm test src/orchestration/orchestratorHelpers.test.ts` locally, and it passed with all 7 tests successful. All modified files were formatted using Prettier as per the delivery requirements.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Resolved ESLint errors in orchestratorHelpers.test.ts and renamed afterModelResponse usage parameter to combinedUsage for clarity"}}