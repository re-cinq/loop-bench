I have fixed the CI failures reported in the previous round. The issues were caused by an incorrect import of the `Ajv` library in `src/orchestration/tools/registry.ts`, which led to typecheck errors (`strict` and `instancePath` not being recognized) and runtime test failures (where `instancePath` was empty, causing validation messages to fallback to "input" instead of naming the failing property).

By switching to a named import (`import { Ajv } from 'ajv'`), the `Ajv` constructor and its associated types (including `ErrorObject` and `Options`) are now correctly resolved as Ajv v8, satisfying both the typechecker and the tests.

I also corrected a statement in `.specify/spec.md` that incorrectly claimed tool *results* were being validated against the schema, which was out of scope for this ticket; it now correctly refers to tool *inputs*.

All 402 local tests passed, and `npm run typecheck` now exits successfully.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures in registry.ts","tdd_next":"acceptance green"}}