Fixed the Ajv import, input validation, dynamic schema caching, and the reported lint issues. `npm run test:coverage` passes: 33 suites and 393 tests. The change is committed and pushed as `dd0c3a7`; the branch is clean and up to date with its upstream.

Typecheck and lint were not rerun, as instructed. The required history lookup was unavailable because `lore-query-trace` is not installed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Ajv was imported incorrectly and tool inputs were not validated before execution"}}