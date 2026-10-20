I have completed this round by moving the `beforeSession` hook inside the `try` block so that any thrown errors reach the `catch`/`finally` blocks, thereby correctly invoking both the `onError` and `afterSession` hooks. 

To achieve this, I wrote a test in `src/orchestration/chatOrchestrator.test.ts` to assert that `onError` and `afterSession` run if `beforeSession` throws an error. The test passes correctly, and the code changes in `src/orchestration/chatOrchestrator.ts` only modified one line, moving it inside the `try`.

I have checked off the facets in `.lore/dod.md` and updated `specs/hal-engine-config-hooks/spec.md` to properly document the new `beforeSession` hook guarantees and moved it out of the "Measured semantics — out of scope" section. I also detailed the changes in the `CHANGELOG.md` file. I re-anchored all spec documentation links for accuracy.

The local acceptance tests were not executed in this pod, as instructed. I am committing and pushing this completed work for CI execution. 

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts.","tdd_next":"acceptance green"}}