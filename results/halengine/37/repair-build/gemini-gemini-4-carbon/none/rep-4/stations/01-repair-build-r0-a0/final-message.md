Fixed all CI failures on `loop-bench/37` (`b07b271`) and pushed to `origin`:
- Replaced `import {Ajv} from 'ajv'` with NodeNext/ESM default import (`import ajvModule from 'ajv'`; `new ajvModule.default(...)`) to resolve `TS2693` and Node ESM module loading errors.
- Added `{cause: error}` in `compileSchema` (`preserve-caught-error`), fixed `re-lint/prefer-early-return` and `re-lint/max-member-chain` in `registry.acceptance.test.ts`, and implemented `ToolRegistry.execute` schema validation with `WeakMap` caching and value-redacted `ToolResponse` error messages.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed ajv NodeNext/ESM default import, eslint errors in registry.ts and registry.acceptance.test.ts, and ToolRegistry.execute input validation"}}