Added, committed, and pushed three red acceptance tests plus the direct-strategy DoD and protocol-spec traceability.

Command run:

`npm test -- --runTestsByPath src/transport/conversationList.acceptance.test.ts --runInBand`

Actual failures:

- Validation: `Expected "valid": true; Received "valid": false`
- Enabled listing: `calls: []`, `lists: []`
- Unsupported handling: expected `UNSUPPORTED`, received `INVALID_MESSAGE`

Result: `3 failed, 3 total`. Branch is synchronized with `origin/loop-bench/144` and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}