Perfect! I've successfully created acceptance tests that define the requirements for ticket #94. Here's a summary of what I've delivered:

## Acceptance Tests Created

I've created **5 acceptance tests** in `src/orchestration/beforeSessionThrows.acceptance.test.ts` that verify the ticket requirements:

### Failing Tests (the behaviors to be implemented):
1. **`calls onError when beforeSession throws`** — Verifies that `onError` hook fires with the error when `beforeSession` throws
2. **`calls afterSession when beforeSession throws`** — Verifies that `afterSession` hook still fires when `beforeSession` throws  
3. **`calls onError and afterSession in correct order when beforeSession throws`** — Verifies both hooks fire in the correct order: `onError` then `afterSession`

### Passing Tests (existing behaviors to preserve):
4. **`throws the beforeSession error to the caller unchanged`** — Confirms error still reaches the caller (already works)
5. **`non-throwing beforeSession still works as before`** — Confirms existing happy-path behavior is maintained

## Test Failure Output

```
FAIL src/orchestration/beforeSessionThrows.acceptance.test.ts
  ● calls onError when beforeSession throws
    Expected: true
    Received: false
    
  ● calls afterSession when beforeSession throws
    Expected: true
    Received: false
    
  ● calls onError and afterSession in correct order when beforeSession throws
    - Expected: ["onError", "afterSession"]
    + Received: []

Test Suites: 1 failed, 1 total
Tests:       3 failed, 2 passed, 5 total
```

## Documentation

I've created `.lore/dod.md` documenting:
- The ticket's central claim (verbatim from the issue)
- Strategy: `direct` — the hook seam already exists and is directly testable
- The four acceptance tests and what they verify
- Implementation facets and out-of-scope items

The tests are committed and pushed, ready for the next phase where the code fix will make them pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}