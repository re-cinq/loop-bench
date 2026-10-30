Fixed and pushed commit `5b9ad39`.

- Corrected the Ajv ESM import and preserved schema compilation errors as causes.
- Validated inputs before executor invocation with redacted error reporting.
- Added dynamic-schema validator caching.
- Resolved both ESLint findings.
- Focused acceptance suite passes: 4/4 tests.
- Branch is synchronized with `origin/loop-bench/37` and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv was imported incorrectly and compiled schemas were never applied before tool execution"}}