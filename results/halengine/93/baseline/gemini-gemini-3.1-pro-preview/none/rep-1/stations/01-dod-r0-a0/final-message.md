I have written the acceptance tests that verify the hook's receipt of the summed tokens over multiple provider calls with an optional breakdown array. I ran the tests to prove they fail exactly because the orchestrator currently passes only the final round's usage, and I've committed and pushed the tests along with the `.lore/dod.md` file capturing this strategy.

```
 FAIL  src/orchestration/chatOrchestrator.acceptance.test.ts > Report usage across every tool round > A turn driven through two tool rounds reports usage covering every provider call in that turn
AssertionError: expected { inputTokens: 20, …(2) } to deeply equal { inputTokens: 45, …(3) }
- Expected
+ Received
  {
-   "inputTokens": 45,
-   "outputTokens": 10,
-   "providerCalls": [
-     {
-       "inputTokens": 10,
-       "outputTokens": 2,
-       "totalTokens": 12,
-     },
...
+   "inputTokens": 20,
+   "outputTokens": 5,
...
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}