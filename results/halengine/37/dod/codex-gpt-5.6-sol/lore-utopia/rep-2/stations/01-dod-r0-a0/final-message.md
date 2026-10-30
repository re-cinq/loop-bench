Defined and pushed the direct acceptance contract in commit `092c189`.

Added:

- `registry.acceptance.test.ts` with two red behavioral tests.
- Ticket-specific validation spec with traceability links.
- `.lore/dod.md` using the `direct` strategy.

Ran only the acceptance file. Both tests failed for the intended missing behavior:

```text
FAIL src/orchestration/tools/registry.acceptance.test.ts

● returns value-redacted schema errors without invoking the executor
  Expected schema errors and only valid input to reach the executor.
  Received "sunny" and all malformed inputs were executed.

● rejects broken static schemas at registration and validates each dynamic definition as resolved
  Expected pattern: /broken-weather/
  Received function did not throw

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

The branch is merged with current `origin/main`, pushed, and synchronized with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}