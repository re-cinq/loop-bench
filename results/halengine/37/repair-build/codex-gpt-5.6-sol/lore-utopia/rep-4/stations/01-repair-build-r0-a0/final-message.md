Fixed and pushed commit `85eea9b`.

- Corrected AJV’s ESM import.
- Implemented schema validation before executor invocation.
- Added safe validation errors and dynamic-schema caching.
- Fixed both ESLint findings and preserved caught error causes.
- `npm test`: 33 suites, 393 tests passed.
- Branch is current with `main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"AJV was imported incorrectly, validation was not executed, and the acceptance test violated two lint rules"}}