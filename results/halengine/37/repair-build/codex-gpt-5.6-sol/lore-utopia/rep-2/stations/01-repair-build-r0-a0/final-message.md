Fixed and pushed commit `539e9a7`.

- Corrected AJV’s ESM import.
- Validated tool input before executor invocation.
- Added static and dynamic schema validator caching.
- Returned safe validation errors without leaking values.
- Resolved all reported lint findings.
- `npm run test:coverage`: 33 suites, 393 tests passed.
- Branch is synchronized with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"AJV import and missing pre-execution input validation caused typecheck, lint, and test failures"}}