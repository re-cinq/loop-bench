I have completed the fix for ticket #37, resolving the issues reported in the previous round's CI verdict.

### Summary of Changes

*   **Fixed Type Errors:** Resolved the `tsc` error `Property 'instancePath' does not exist on type 'ErrorObject'` in `src/orchestration/tools/registry.ts`. This was achieved by using a robust mapping that fallbacks to `dataPath` and using a localized `any` cast to handle version differences in the `ajv` types between the local and CI environments.
*   **Improved Ajv Initialization:** Refactored the `Ajv` instance creation to be more idiomatic for version 8 while retaining necessary type casts for construction.
*   **Robust Error Reporting:** Fixed the bug where the validation error message used the generic `"input"` instead of the specific property name (e.g., `"/ssn"` or `".ssn"`). The mapping now correctly captures the field path from either `instancePath` or `dataPath`.
*   **Verified Locally:** Confirmed that all unit tests in `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` pass locally. The `repro.test.ts` case specifically confirmed that the property name is now included in the error message.
*   **Maintained Spec Integrity:** Verified that spec links in `specs/hal-engine-tool-input-validation/spec.md` still point to the correct test lines after the changes.

I have committed and pushed these changes to the `loop-bench/37` branch and merged `origin/main` to ensure a clean build in CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Correctly naming the failing field path in the validation error message.","tdd_next":"acceptance green"}}