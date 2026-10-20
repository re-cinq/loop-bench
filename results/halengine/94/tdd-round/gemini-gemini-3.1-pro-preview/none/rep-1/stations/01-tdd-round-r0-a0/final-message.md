I have completed the TDD round for `#94 Run onError and afterSession when beforeSession throws`. 

Here is what was accomplished:
1. Wrote a failing unit test in `src/orchestration/chatOrchestrator.test.ts` to assert that a throwing `beforeSession` hook invokes `onError` and `afterSession` before rejecting.
2. Verified the test failed because `beforeSession` previously escaped the `try/catch` block.
3. Implemented the fix by moving the `beforeSession` execution inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
4. Formatted the codebase utilizing `npx prettier --write`.
5. Re-ran the test suite for `src/orchestration/chatOrchestrator.test.ts` and confirmed the bar went green. 
6. Addressed the remaining documentation facets by appending the correct `CHANGELOG.md` entry and adjusting the out-of-scope preamble in `specs/hal-engine-config-hooks/spec.md`.
7. Ran `scripts/repoint-spec-anchors.mjs` to automatically heal links offset by the newly inserted unit tests in `chatOrchestrator.test.ts` and ticked off all `dod.md` checkboxes.

The round only ran tests localized to the module modified (`src/orchestration/chatOrchestrator.test.ts`). The round ran no acceptance tests and no full-repo suite tests here.
There was exactly 1 red test that I wrote, which is now green. There were 0 regressions. I noticed no unrelated code smells during this round. 

Changes have been successfully committed and pushed to `loop-bench/94` and safely merged with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts.","tdd_next":"acceptance green"}}