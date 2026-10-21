I fixed the `typecheck` and `test` failures reported by CI. The primary issue was an incorrect `Ajv` import in `src/orchestration/tools/registry.ts`, which caused a compilation error and prevented the orchestration tests from running, resulting in low coverage.

I changed the import to a default import (`import Ajv from 'ajv'`), which is correct for this project's ESM configuration and `ajv` version. I also expanded the test coverage in `src/orchestration/tools/registry.test.ts` to include discovery methods (`get`, `has`, `getDefinitions`, etc.) and full `ToolResponse` features, achieving 100% statement and function coverage for the registry.

I verified the fix by running `registry.test.ts` and `chatOrchestrator.test.ts` manually, both of which pass with high coverage. I also confirmed that all documentation updates and spec links required by the ticket are present and correct.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in src/orchestration/tools/registry.test.ts and src/orchestration/chatOrchestrator.test.ts","tdd_next":"acceptance green"}}