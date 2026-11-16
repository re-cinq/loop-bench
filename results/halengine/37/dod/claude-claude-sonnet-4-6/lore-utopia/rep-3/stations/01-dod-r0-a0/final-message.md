Branch is pushed and up to date. Here is the actual failure output from the two acceptance tests:

---

**Test 1** — `src/orchestration/tools/registry.acceptance.test.ts`
```
● ToolRegistry.execute input validation › skips the executor and names the missing required field in its rejection

  - Expected  - 2
  + Received  + 2

    Object {
  -   "calls": 0,
  -   "result": StringMatching /location/,
  +   "calls": 1,
  +   "result": "sunny",
    }
```
The executor was called (`calls: 1`) and returned `'sunny'` — no validation happened.

**Test 2** — `src/orchestration/chatOrchestrator.acceptance.test.ts`
```
● ChatOrchestrator tool-loop with input validation › resolves and makes the rejection text visible to the provider before the caller retries

  - Expected  - 1
  + Received  + 1

    Object {
  -   "rejectionMentionsField": true,
  +   "rejectionMentionsField": false,
      "resolved": "done",
    }
```
The provider received `'sunny'` as the tool result, not a validation error naming `location`.

---

**Strategy: `direct`** — `ToolRegistry.execute` is a callable public method; no seam construction needed.

Two tests, both red for the stated reason. The implementer must add input validation to `ToolRegistry.execute` (via ajv), compile schemas at `register` time, and return a `ToolResponse` on failure rather than calling the executor. When those two tests are green, the central claim of the ticket is satisfied.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}