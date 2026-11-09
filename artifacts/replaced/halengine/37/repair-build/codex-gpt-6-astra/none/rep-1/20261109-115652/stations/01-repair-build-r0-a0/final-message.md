Pushed `9c72b7c` fixing the Ajv import and three lint findings. Formatted both changed files; branch is current with main and fully pushed.

Scoped tests: 11 passed, 3 failed because `execute` does not invoke validation. Lint and typecheck were not run, as instructed.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Ran Jest on registry.test.ts, registry.acceptance.test.ts and config.test.ts; three acceptance tests remain red because execute does not validate input."}}