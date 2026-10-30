Fixed and pushed commit `db6449b`.

- Corrected Ajv’s ESM import.
- Added schema validation before tool execution with redacted errors.
- Added dynamic-schema validator caching.
- Preserved schema compilation errors as causes.
- Fixed the acceptance-test lint findings.
- Targeted tests pass: 2 suites, 5 tests.
- Branch is synchronized with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv was imported incorrectly and compiled schemas were never applied before tool execution"}}