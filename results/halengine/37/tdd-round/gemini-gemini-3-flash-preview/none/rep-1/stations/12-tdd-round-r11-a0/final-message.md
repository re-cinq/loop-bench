I have fixed the CI failures that were blocking the progress of the ticket. These included TypeScript errors in `src/orchestration/tools/registry.ts` due to incorrect `Ajv` imports and ESLint errors in `src/orchestration/tools/registry.test.ts` related to code duplication and excessive `expect` calls. I also updated the specification links in `specs/hal-engine-tool-input-validation/spec.md` to align with the refactored test file.

My verification shows that both the unit tests and the acceptance tests for the tool registry now pass locally. The code is formatted, committed, and pushed to the repository.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures","tdd_next":"acceptance green"}}