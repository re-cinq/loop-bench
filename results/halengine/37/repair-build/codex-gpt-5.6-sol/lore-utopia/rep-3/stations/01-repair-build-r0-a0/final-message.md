Fixed and pushed commit `1e796fe`.

- Corrected the Ajv import and preserved caught-error causes.
- Added schema validation before executor invocation.
- Cached dynamic validators by schema object.
- Fixed both ESLint findings.
- Scoped registry tests pass: 5/5.
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv import failed and ToolRegistry did not reject schema-invalid input before executor invocation"}}