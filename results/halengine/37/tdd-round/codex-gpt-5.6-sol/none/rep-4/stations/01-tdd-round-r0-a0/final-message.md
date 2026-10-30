Implemented and pushed commit `c7fac13`.

- Added AJV input validation before executor invocation.
- Added and linked a unit test for missing required properties.
- Test passed: `registry.test.ts`.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with `origin/main` and upstream.
- Next facet: static schema compilation and validator caching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate input before invoking the executor","tdd_next":"compile static schemas at registration and cache function-sourced schemas"}}