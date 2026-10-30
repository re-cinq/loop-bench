Fixed and pushed commit `51737e2`.

- Corrected Ajv’s runtime import.
- Added actual input validation and safe error messages.
- Cached dynamic schema validators by schema object.
- Fixed all reported lint findings.
- Targeted registry suites pass: 2 suites, 5 tests.
- Branch is synchronized with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv was imported incorrectly and compiled schemas were never used to validate tool input"}}
