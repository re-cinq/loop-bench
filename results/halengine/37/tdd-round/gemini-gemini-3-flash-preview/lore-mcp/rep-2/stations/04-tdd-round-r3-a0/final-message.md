I have completed the TDD round by fixing the lint errors and broken spec links that caused the previous CI failures.

### Summary of Changes

1.  **Refactored `src/orchestration/tools/registry.test.ts`:**
    *   Simplified member chain accesses (e.g., `compileSpy.mock.calls.length`) to resolve `re-lint/max-member-chain` violations.
    *   Removed redundant `([validated by: ...])` spec links from all `it` test titles. These links belong in the specification file pointing to the tests, not in the test names themselves.
2.  **Refactored `src/orchestration/chatOrchestrator.test.ts`:**
    *   Removed the redundant spec link from the tool-loop recovery test title to match the specification's expectations.
3.  **Updated `specs/hal-engine-tool-input-validation/spec.md`:**
    *   Synchronized the `[validated by: name]` test names to match the updated titles in the test files.
    *   Updated the `#Lnn` line number anchors to point to the correct declaration lines in the test files, resolving "rotten anchor" warnings.
4.  **Verification:**
    *   Ran `node scripts/lore-list-tests.mjs` and confirmed tests are correctly discovered.
    *   Ran `npm run spec:names` and confirmed all 405 citations now correctly name the tests they point at.
    *   Verified that the unit tests in `registry.test.ts` and `chatOrchestrator.test.ts` pass locally.

I have committed and pushed these changes to the `loop-bench/37` branch and confirmed that the branch is up to date with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix lint errors and spec links","tdd_next":"acceptance green"}}