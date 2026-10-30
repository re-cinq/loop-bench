Fixed and pushed commit `9ce2c3b`.

- Corrected Ajv ESM import and preserved compilation error causes.
- Added runtime input validation with dynamic-schema caching.
- Returned value-safe validation errors without invoking executors.
- Fixed reported ESLint findings.
- Scoped registry tests pass: 2 suites, 5 tests.
- Branch is current with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv import failed and compiled schemas were never applied during tool execution"}}