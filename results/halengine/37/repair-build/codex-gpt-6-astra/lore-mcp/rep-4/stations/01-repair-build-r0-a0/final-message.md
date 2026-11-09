Pushed `b20ba30` with the import and lint fixes. Formatted both changed files; branch is current with `main` and fully pushed.

Targeted tests: 11 passed, 3 failed because `execute` does not validate input. Lint, typecheck, and build were not run.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Ran npm test -- --runInBand src/orchestration/tools/registry.test.ts src/orchestration/tools/registry.acceptance.test.ts src/config.test.ts; three acceptance tests remain red because execute does not validate input"}}