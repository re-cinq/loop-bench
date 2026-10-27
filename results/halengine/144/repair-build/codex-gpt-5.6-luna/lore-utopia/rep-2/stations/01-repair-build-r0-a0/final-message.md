Fixed and pushed commit `a38cffa`.

- Wired session-list WebSocket handling to the session store.
- Resolved reported test lint findings.
- `npm run test:coverage`: 69 suites, 696 tests passed.
- Formatted changed files and merged latest `origin/main`.
- Branch is synced with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"session list frames were validated but never handled; added store-backed responses and fixed duplicate/early-return/flag lint findings"}}