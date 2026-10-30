Fixed and pushed commit `6d1f58c`.

- Corrected Ajv runtime import.
- Added schema validation before tool execution with redacted errors.
- Added dynamic-schema validator caching.
- Preserved caught schema compilation errors as causes.
- Fixed both ESLint findings.
- Targeted acceptance suite passes: 4/4 tests.
- Branch is current with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv was imported incorrectly and tool inputs were not validated before executor invocation"}}