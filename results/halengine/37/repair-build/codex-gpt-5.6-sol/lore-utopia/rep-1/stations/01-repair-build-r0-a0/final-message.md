Fixed and pushed commit `1ebe632`.

- Corrected Ajv import and preserved compilation error causes.
- Added schema validation before executor calls with redacted errors.
- Cached dynamic-schema validators.
- Fixed both ESLint findings.
- Targeted acceptance suite passes: 4/4 tests.
- Branch is up to date with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv was imported incorrectly, validation was not executed, and the acceptance test violated two lint rules"}}