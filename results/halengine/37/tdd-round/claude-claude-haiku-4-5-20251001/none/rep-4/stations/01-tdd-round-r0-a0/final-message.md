Excellent! I've successfully completed one red-green-refactor round:

## Summary

**Red phase:** Wrote a failing unit test in `src/orchestration/tools/registry.test.ts` that verifies the registry throws an error naming the tool when registering an invalid JSON schema.

**Green phase:** Implemented schema compilation in `ToolRegistry` using AJV:
- Added `ajv` to package.json dependencies with correct configuration (`strict: false`, `validateFormats: false`)
- Modified `ToolRegistry.register()` to compile static tool schemas at registration time
- Throws an error naming the tool if the schema cannot be compiled
- Set up `WeakMap` infrastructure for function-valued schema caching

**Result:** The unit test is now green, and the implementation moves one of the acceptance tests (schema validation at register time) closer to passing. The next round should focus on implementing input validation in the `execute()` method.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"schema compilation at register time","tdd_next":"input validation in execute"}}