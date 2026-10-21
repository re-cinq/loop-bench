I have resolved the CI failures reported in the previous round.

1.  **Fixed Typecheck Errors:** In `src/orchestration/tools/registry.ts`, I updated the `Ajv` import to use the named export `{ Ajv }`, which correctly identifies it as a class type in the `NodeNext` environment. I also updated the error mapping to use `(err as any).instancePath ?? (err as any).dataPath` to ensure compatibility with both Ajv 8 and Ajv 6/7, which guarantees that field names are included in validation error messages even if an older version of Ajv is present in the dependency tree.
2.  **Resolved Lint Errors:** In `src/orchestration/tools/registry.test.ts`, I consolidated multiple `expect` calls into a single `toMatchObject` assertion to satisfy the `re-lint/max-expects` rule.
3.  **Fixed Test Failures:** I updated the test assertions to use regex matching for validation error messages (e.g., matching both "must have" and "should have" required property), making the tests more resilient to minor variations in Ajv's default error messages while still enforcing that the required fields and types are mentioned.
4.  **Verified Locally:** I ran the unit tests for both `ToolRegistry` and `ChatOrchestrator` using the project's test runner (`node --experimental-vm-modules node_modules/jest/bin/jest.js`), and all 30 tests passed.
5.  **Maintained Traceability:** I ran the `repoint-spec-anchors.mjs` script and verified that spec links remain valid.

All reported CI findings have been addressed, and the code has been formatted according to the project's standards.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures (typecheck, lint, test)","tdd_next":"acceptance green"}}