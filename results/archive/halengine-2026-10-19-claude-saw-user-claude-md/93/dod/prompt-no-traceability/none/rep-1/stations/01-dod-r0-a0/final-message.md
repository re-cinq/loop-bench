I have completed the definition of done for ticket #93. 

I chose the `direct` strategy since `createChatOrchestrator` provides a clean runtime seam to test `afterModelResponse` directly. The tests define a `TurnUsage` shape (extending `UsageMetadata` with a `rounds` array) to make the sum unambiguously discoverable in the type system without breaking existing consumers who expect standard `UsageMetadata` fields.

I have formatted, committed, and pushed the new `src/orchestration/usage.acceptance.test.ts` file and `.lore/dod.md`. The branch is up-to-date with `origin/main` and pushed.

Here is the failing output from the acceptance tests proving the current under-counting behaviour:

```
 FAIL  src/orchestration/usage.acceptance.test.ts > ChatOrchestrator usage reporting > reports usage covering every provider call in a turn with multiple tool rounds
AssertionError: expected 5 to be 35 // Object.is equality

- Expected
+ Received

- 35
+ 5

 ❯ src/orchestration/usage.acceptance.test.ts:74:39
     72| 
     73|     expect(reportedUsage).toBeDefined();
     74|     expect(reportedUsage.inputTokens).toBe(35); // 10 + 20 + 5
       |                                       ^
     75|     expect(reportedUsage.outputTokens).toBe(20); // 5 + 10 + 5
     76|     expect(reportedUsage.totalTokens).toBe(55); // 15 + 30 + 10
```

```
 FAIL  src/orchestration/usage.acceptance.test.ts > ChatOrchestrator usage reporting > keeps counting rounds that reported usage even if some rounds report none
AssertionError: expected 20 to be 30 // Object.is equality

- Expected
+ Received

- 30
+ 20

 ❯ src/orchestration/usage.acceptance.test.ts:112:39
    110| 
    111|     expect(reportedUsage).toBeDefined();
    112|     expect(reportedUsage.inputTokens).toBe(30); // 10 + 0 + 20
       |                                       ^
    113|     expect(reportedUsage.outputTokens).toBe(15);
    114|     expect(reportedUsage.totalTokens).toBe(45);
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}