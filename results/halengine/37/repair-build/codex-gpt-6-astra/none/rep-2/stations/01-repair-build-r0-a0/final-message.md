Pushed `5a3c962`: fixed the Ajv import and all three lint findings. Formatted both files. Branch is current with main and fully pushed.

Scoped tests: 11 passed; three acceptance tests still fail because `execute` doesn’t validate input.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Ran npm test -- --runInBand src/orchestration/tools/registry.test.ts src/orchestration/tools/registry.acceptance.test.ts src/config.test.ts; three acceptance tests remain red because execute lacks input validation."}}