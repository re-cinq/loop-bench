I have fixed the CI regressions in `src/orchestration/tools/registry.ts` by correctly handling the Ajv `ErrorObject` properties. The previous implementation was failing in CI due to a TypeScript error and a runtime `TypeError` when accessing `instancePath`, likely due to a version mismatch or transitive dependency conflict between Ajv v6 and v8 in the environment.

I updated the error path resolution to be defensive and compatible with multiple Ajv versions by checking both `instancePath` and `dataPath`. I also added a type cast to resolve the `Property 'instancePath' does not exist on type 'ErrorObject'` TypeScript error.

I verified the fix by running the registry tests, all of which now pass. The rest of the ticket's requirements—including full unit test coverage in `chatOrchestrator.test.ts`, spec links, documentation updates in `README.md` and `docs/adding-a-tool.md`, and the `CHANGELOG.md` entry—were already correctly implemented.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI regressions and stabilize implementation","tdd_next":"acceptance green"}}