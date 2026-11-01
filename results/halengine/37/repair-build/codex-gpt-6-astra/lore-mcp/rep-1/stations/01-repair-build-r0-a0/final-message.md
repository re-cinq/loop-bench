Pushed `c384852`: fixed the Ajv import and all three lint findings. Formatted both changed files. Branch is current with `main` and fully pushed.

Scoped tests: 11 passed, 3 failed because `execute` does not validate input. Lint, typecheck, and build were not run as instructed.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Ran npm test -- --runInBand --runTestsByPath src/orchestration/tools/registry.test.ts src/orchestration/tools/registry.acceptance.test.ts src/config.test.ts; three acceptance tests remain red because execute does not validate input"}}