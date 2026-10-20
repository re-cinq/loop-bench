I have analyzed the ticket and written an acceptance test that proves the failure by defining the expected behavior. Since `createChatOrchestrator` allows providing configuration hooks and we can observe their lifecycle behavior programmatically, I used the `direct` strategy. 

Here is the run of the newly added acceptance test, showing the exact red bar that proves `onError` (and subsequently `afterSession`) is missed when `beforeSession` throws an error:

```
FAIL src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts
  ● beforeSession throwing › runs onError and afterSession when beforeSession throws

    expect(received).toBe(expected) // Object.is equality

    Expected: [Error: Database connection failed in beforeSession]
    Received: undefined

      62 |     );
      63 |
    > 64 |     expect(caughtError).toBe(errorToThrow);
         |                         ^
      65 |     expect(afterSessionRan).toBe(true);
      66 |   });
      67 | });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:64:25)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.274 s
Ran all test suites matching src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts.
```

The failing test, `.lore/dod.md` file, and the updated specification constraint tracking it have been committed and pushed to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}