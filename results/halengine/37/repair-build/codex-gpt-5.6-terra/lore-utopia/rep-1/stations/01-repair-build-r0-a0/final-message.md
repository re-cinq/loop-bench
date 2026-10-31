Fixed and pushed CI failures: Ajv’s default ESM import, validation-before-execution behavior with safe error messages, dynamic schema caching, and acceptance-test lint issues.

Verified with:
`npm test -- src/orchestration/tools/registry.test.ts src/orchestration/tools/registry.acceptance.test.ts`

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed Ajv ESM loading and tool-input validation/lint failures"}}