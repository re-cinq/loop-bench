Fixed and pushed commit `e3fbbfb`.

- Corrected Ajv ESM import and preserved schema compilation errors as causes.
- Added input validation before executor invocation, including dynamic-schema caching and value-safe errors.
- Resolved both ESLint findings.
- Targeted registry suites pass: 2 suites, 5 tests.
- Branch is current with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv imported incorrectly and compiled validators were never applied before tool execution"}}