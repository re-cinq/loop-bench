I have completed the TDD round for the second facet ("Compile static `ToolDefinition.inputSchema` at `ToolRegistry.register` time (throwing an error naming the tool on invalid schemas) and cache compiled validators for function-valued `ToolDefinitionSource` schemas by schema object reference (`WeakMap`).").

1. I fixed the ESLint failures in `src/orchestration/tools/registry.acceptance.test.ts` and the TS issues by switching to named imports for `Ajv` which resolves the `strict: false` options typing mismatch.
2. I added a failing unit test in `src/orchestration/tools/registry.test.ts` to assert that an invalid static schema throws at register time.
3. I ran the test I wrote to confirm the failing phase using Jest locally.
4. I implemented the `WeakMap` cache and static pre-compilation at register time in `src/orchestration/tools/registry.ts`, successfully passing the test and type check.
5. I formatted the codebase, committed, pushed, synced with `main`, and updated `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time","tdd_next":"Validate input in ToolRegistry.execute before invoking the executor"}}