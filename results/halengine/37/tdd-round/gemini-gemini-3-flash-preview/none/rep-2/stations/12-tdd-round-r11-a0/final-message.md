I have fixed the CI failures and ensured that all requirements for tool input validation are met.

### Changes:
- **Fixed `Ajv` import**: Updated `import {Ajv} from 'ajv'` to `import Ajv from 'ajv'` in `src/orchestration/tools/registry.ts` and its test file. This resolves the TypeScript error where `Ajv` was being treated only as a type rather than a constructor.
- **Removed `any` types**: Replaced `any` with proper AJV types (`Options`, `ErrorObject`) in `src/orchestration/tools/registry.ts`, satisfying ESLint's `no-explicit-any` rule.
- **Added missing spec links**: Added `([validated by](...))` links to `specs/hal-engine-providers/spec.md` for mock provider tests that were lacking them, resolving ESLint's `re-lint/require-spec-link` errors.
- **Fixed rotten spec links**: Updated an outdated line anchor in `specs/hal-engine-providers/spec.md` and ensured all other links were correctly repointed using the project's `repoint-spec-anchors.mjs` script.
- **Verified all tests**: Ran unit tests for the registry and orchestrator, as well as the registry acceptance tests. All tests passed, confirming that the tool input validation logic is correct and well-integrated.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance green","tdd_next":"acceptance green"}}