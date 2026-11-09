Fixed and pushed the two CI findings in the acceptance test: the prompt builder uses valid configuration properties, and the test uses one assertion while checking both error identities and `afterSession`.

The focused test passed with `npm test -- --runInBand src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. Typecheck and lint were left to CI as instructed. The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Corrected invalid prompt configuration and the acceptance test's multiple assertions"}}