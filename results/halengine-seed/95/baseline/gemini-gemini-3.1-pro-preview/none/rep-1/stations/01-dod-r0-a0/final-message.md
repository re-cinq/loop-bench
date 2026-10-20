I have successfully created and run the executable acceptance tests that define the Definition of Done for this ticket. The strategy used was `direct` because `onError` provides the necessary existing lifecycle seam to test this behaviour.

The tests verify that when a provider rejects with a string, plain object, or `undefined`, the orchestrator still fires the `onError` hook exactly once by wrapping the thrown value in an `Error` and passing the raw original value as its `cause`. They also ensure that the original raw rejection reaches the caller unchanged.

As required, I ran the tests and verified they correctly fail because the behaviour does not exist yet (the gate on `error instanceof Error` drops non-Error objects entirely, resulting in `callCount` remaining 0).

Failure output from the test run:
```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● ChatOrchestrator onError › calls onError once with an Error whose cause is a thrown string, and rejects to the caller unchanged

    expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 0

      51 |
      52 |     expect(caughtRejection).toBe('string rejection');
    > 53 |     expect(callCount).toBe(1);
         |                       ^
      54 |     expect(capturedError).toBeInstanceOf(Error);
      55 |     expect(capturedError?.cause).toBe('string rejection');
      56 |   });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:53:23)

  ● ChatOrchestrator onError › calls onError once with an Error whose cause is a thrown plain object, and rejects to the caller unchanged

    expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 0

      77 |
      78 |     expect(caughtRejection).toBe(obj);
    > 79 |     expect(callCount).toBe(1);
         |                       ^
      80 |     expect(capturedError).toBeInstanceOf(Error);
      81 |     expect(capturedError?.cause).toBe(obj);
      82 |   });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:79:23)

  ● ChatOrchestrator onError › calls onError once with an Error whose cause is thrown undefined, and rejects to the caller unchanged

    expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 0

      105 |     expect(didThrow).toBe(true);
      106 |     expect(caughtRejection).toBeUndefined();
    > 107 |     expect(callCount).toBe(1);
          |                       ^
      108 |     expect(capturedError).toBeInstanceOf(Error);
      109 |     expect(capturedError?.cause).toBeUndefined();
      110 |   });

      at Object.<anonymous> (src/orchestration/chatOrchestrator.acceptance.test.ts:107:23)
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}