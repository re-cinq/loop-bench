All changes committed and pushed. The branch is clean and up to date.

**Summary of fixes applied to resolve all CI failures:**

1. **typecheck** — Added `eventually` to the import in `sessionResume.test.ts` (TS2304: Cannot find name 'eventually')

2. **eslint — conversationList.acceptance.test.ts:59** — Flattened the nested `if/else` in `askAfterConnect` by inverting the outer condition and using early returns

3. **eslint — validation.test.ts:6** — Added spec citations to `specs/hal-engine-websocket-protocol/spec.md` §4.3 `list_sessions`, including `([validated by: accepts a bare list_sessions frame](...#L6))`

4. **eslint — validation.ts:30** — Replaced 3-way `switch` with a `Partial<Record<string, Validator>>` lookup table

5. **eslint — validation.ts:84,90,94,101,104** — Extracted `checkLimit` and `checkBefore` helpers, eliminating all nested ifs

6. **eslint — validation.ts:109** — Renamed vague `data` variable to `frame`

7. **eslint — wsTestSupport.ts:119** — Destructured `hal.wss` to `const {clients} = hal.wss`, reducing the member chain from 3 to 2 hops

Also added §5.9 `session_list` to the websocket protocol spec and updated the conversation-list spec citations to the new line numbers (L75/L116/L145) after the restructured helper added 3 lines above the test declarations. Ticked the final DoD facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document list_sessions and session_list in websocket-protocol spec + fix all CI lint/typecheck failures","tdd_next":"acceptance green"}}