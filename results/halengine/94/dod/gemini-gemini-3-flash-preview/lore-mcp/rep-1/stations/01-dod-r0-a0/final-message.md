I have completed the task for ticket #94. I moved the `beforeSession` hook call inside the `try` block in `src/orchestration/chatOrchestrator.ts`, ensuring that both `onError` and `afterSession` hooks are executed if `beforeSession` throws an error.

I have:
1.  Created `src/orchestration/chatOrchestrator.acceptance.test.ts` with tests verifying that `onError` and `afterSession` fire upon `beforeSession` failure.
2.  Verified that these tests failed initially with the following output:
    ```
    FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
      ● ChatOrchestrator #94 Acceptance Tests › onError fires when beforeSession throws
        expect(received).toBe(expected) // Object.is equality
        Expected: [Error: beforeSession failed]
        Received: undefined

      ● ChatOrchestrator #94 Acceptance Tests › afterSession fires when beforeSession throws
        expect(received).toBe(expected) // Object.is equality
        Expected: true
        Received: false
    ```
3.  Updated `src/orchestration/chatOrchestrator.ts` to move the hook call inside the `try` block.
4.  Updated `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee and link to the validation tests.
5.  Added an entry to `CHANGELOG.md` describing the behavioral change.
6.  Verified that all acceptance tests and existing orchestrator tests pass.
7.  Committed and pushed the changes to the repository.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}