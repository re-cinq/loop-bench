Fixed the CI failures on `loop-bench/37` (commit `78b8dbe`):
- `src/orchestration/tools/registry.ts`: Replaced `import {Ajv} from 'ajv'` (which failed `typecheck` with `TS2693` and Node ESM `SyntaxError`) with `createRequire(import.meta.url)` and type-only `Ajv`/`ValidateFunction` imports, attached `{cause: error}` in `compileSchema` (`preserve-caught-error`), and implemented `ToolRegistry.execute` input validation with `WeakMap` caching for function-valued schemas and value-free rejection messages/logs.
- `src/orchestration/tools/registry.acceptance.test.ts`: Fixed `re-lint/prefer-early-return` and `re-lint/max-member-chain` in the stub provider.
- `src/orchestration/tools/registry.test.ts` & `specs/hal-engine-tool-input-validation/spec.md`: Added unit tests covering valid pass-through, `enum` rejection, `Unknown tool` throws, static schema compilation reuse, and dynamic schema caching, linked them in the spec, and updated `Status` to `Shipped`.

Verified locally:
- `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/ src/orchestration/chatOrchestrator.test.ts src/config.test.ts --coverage --collectCoverageFrom='src/orchestration/tools/registry.ts' --coverageThreshold='{}'`: 4 suites, 41 tests passed (`registry.ts`: 86.36% stmts, 70.58% branches, 77.77% funcs, 90% lines).
- `npx prettier --check`, `npm run docs:check`, `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`: all passed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Fixed invalid named Ajv ESM/TS import, three ESLint errors, and implemented ToolRegistry.execute input validation with linked unit tests"}}