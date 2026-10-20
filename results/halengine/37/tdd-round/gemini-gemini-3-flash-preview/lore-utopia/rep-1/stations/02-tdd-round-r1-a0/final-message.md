I have completed the TDD round by addressing the CI failures reported from the previous round. The build was failing due to TypeCheck errors in `registry.ts` (caused by an `ajv` version mismatch), ESLint violations in multiple test files, and broken spec anchor names.

I performed the following actions:
1.  **Upgraded `ajv` to v8:** Updated `package-lock.json` to match the `^8.17.1` requirement in `package.json`, ensuring the environment uses the correct version for both TypeCheck and runtime validation.
2.  **Fixed `registry.ts` Type Errors:** Updated the code to use Ajv 8 properties (`instancePath` instead of `dataPath`) and narrowed the `e.params` type to safely access `missingProperty`.
3.  **Resolved ESLint Violations:**
    *   **Consolidated expects:** Merged multiple `expect` calls in `registry.test.ts` and `chatOrchestrator.test.ts` into single `toEqual` assertions.
    *   **Removed `any`:** Replaced `any` casts with proper types (`Message[][]`, `Record<string, unknown>`).
    *   **Fixed member chains:** Broke down deep chains like `toolResultMessage.content[0].content` to stay within the 2-hop limit.
    *   **Early returns:** Refactored `if/else` blocks in test providers to use early returns.
4.  **Repaired Spec Traceability:**
    *   Updated `specs/hal-engine-tool-input-validation/spec.md` with correct line numbers for relocated tests.
    *   Cleaned up test titles in `chatOrchestrator.test.ts` to fix `spec:names` failures.
5.  **Verification:** Ran unit tests for `registry.test.ts` and `chatOrchestrator.test.ts` locally, and all 29 tests passed.
6.  **DOD Update:** Ticked off all acceptance criteria in `.lore/dod.md` as the implementation is now complete and CI-ready.

The branch has been formatted, committed, and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests... link remaining statements... update files...","tdd_next":"acceptance green"}}