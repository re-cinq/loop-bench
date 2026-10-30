Fixed and pushed commit `debac0d`.

- Corrected the Ajv ESM import and preserved caught schema errors as causes.
- Added runtime validation with safe, value-free error messages.
- Added dynamic-schema validator caching.
- Fixed both ESLint findings.
- Registry test suites pass: 5/5 tests.
- Branch is current with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv was imported incorrectly and compiled validators were never applied before tool execution"}}