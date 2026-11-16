Branch is clean and pushed. Here's a summary of all fixes:

**Lint errors fixed:**
- `validation.test.ts:58` — `Array(9).fill(false)` → `Array.from({length: 9}, () => false)` (no-flag-params)
- `conversationList.acceptance.test.ts:67` — flipped `if (frame.type === 'connected')` to `if (frame.type !== 'connected')` guard with flat happy path (prefer-early-return)
- Extracted `eventually`, `delegatingTo`, and `drainAndStop` into `wsTestSupport.ts`; removed the duplicate definitions from both `conversationList.acceptance.test.ts` and `sessionResume.test.ts` (no-duplicate-code, 3 blocks × 2 files = 6 errors eliminated)

**Test failures fixed:**
- Added `list_sessions` frame handling to `messageHandler.ts` — returns `session_list` with ISO-converted dates, empty list when store has no `listFor`, `SERVER_ERROR` with `ws`-category error log when `listFor` throws
- Threaded `sessionStore` from `createServer.ts` into `createMessageHandler`

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"8 eslint errors (no-duplicate-code, prefer-early-return, no-flag-params) and list_sessions handler missing from messageHandler"}}