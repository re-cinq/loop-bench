I have created and committed the acceptance tests and the Definition of Done in `.lore/dod.md` using the `direct` strategy. The code was formatted using `prettier`, committed, and successfully pushed to `origin/loop-bench/93`. The branch is up-to-date with `origin/main`.

Here is the exact test failure output demonstrating the red bar required by the ticket (only the last provider's usage is reported):

```
 ❯ src/orchestration/chatOrchestrator-usage.acceptance.test.ts (3 tests | 2 failed) 54ms
   × afterModelResponse hook usage reporting > A turn driven through two tool rounds reports usage covering every provider call in that turn 30ms
     → expected { inputTokens: 40, …(2) } to deeply equal { inputTokens: 70, …(2) }
   × afterModelResponse hook usage reporting > A provider that reports no usage on some rounds does not make the total undefined or NaN: the rounds that reported are still counted 12ms
     → expected { inputTokens: 20, …(2) } to deeply equal { inputTokens: 30, …(2) }
   ✓ afterModelResponse hook usage reporting > a turn where nothing reported still reports nothing 10ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/orchestration/chatOrchestrator-usage.acceptance.test.ts > afterModelResponse hook usage reporting > A turn driven through two tool rounds reports usage covering every provider call in that turn
AssertionError: expected { inputTokens: 40, …(2) } to deeply equal { inputTokens: 70, …(2) }

- Expected
+ Received

  {
-   "inputTokens": 70,
-   "outputTokens": 15,
-   "totalTokens": 85,
+   "inputTokens": 40,
+   "outputTokens": 2,
+   "totalTokens": 42,
  }

 ❯ src/orchestration/chatOrchestrator-usage.acceptance.test.ts:67:27
     65|     await orchestrator.processMessage(createSession('ask'));
     66| 
     67|     expect(reportedUsage).toEqual({
       |                           ^
     68|       inputTokens: 70, // 10 + 20 + 40
     69|       outputTokens: 15, // 5 + 8 + 2

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  src/orchestration/chatOrchestrator-usage.acceptance.test.ts > afterModelResponse hook usage reporting > A provider that reports no usage on some rounds does not make the total undefined or NaN: the rounds that reported are still counted
AssertionError: expected { inputTokens: 20, …(2) } to deeply equal { inputTokens: 30, …(2) }

- Expected
+ Received

  {
-   "inputTokens": 30,
-   "outputTokens": 7,
-   "totalTokens": 37,
+   "inputTokens": 20,
+   "outputTokens": 2,
+   "totalTokens": 22,
  }

 ❯ src/orchestration/chatOrchestrator-usage.acceptance.test.ts:95:27
     93|     await orchestrator.processMessage(createSession('ask'));
     94| 
     95|     expect(reportedUsage).toEqual({
       |                           ^
     96|       inputTokens: 30, // 10 + 20
     97|       outputTokens: 7, // 5 + 2

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}