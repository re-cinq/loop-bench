The Definition of Done for ticket #95 is defined by four acceptance tests in `src/orchestration/onError.acceptance.test.ts`. These tests verify that the `onError` hook is called for all rejections, including non-`Error` values (strings, objects, `undefined`), and that `Error` instances are passed through unchanged.

The tests currently fail because `src/orchestration/chatOrchestrator.ts` gates the `onError` call with an `instanceof Error` check, causing it to skip non-`Error` rejections.

### Changes made:
- Created `src/orchestration/onError.acceptance.test.ts` with 4 test cases.
- Updated `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee and added validation links.
- Updated `CHANGELOG.md` with an entry for the fix.
- Updated `.lore/dod.md` with the strategy and facet progress.

### Failure Output:
```text
FAIL src/orchestration/onError.acceptance.test.ts
  ● onError acceptance tests › calls onError for string rejection
    expect(received).toBeDefined()
    Received: undefined

  ● onError acceptance tests › calls onError for object rejection
    expect(received).toBeDefined()
    Received: undefined

  ● onError acceptance tests › calls onError for undefined rejection
    expect(received).toBeDefined()
    Received: undefined
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}