Branch is current. This round fixed the two CI failures:

1. **eslint `prefer-early-return`** in `conversationList.acceptance.test.ts:58` — flipped the `if (frame.type === 'connected')` to an early guard on `!== 'connected'`, letting the connected path run flat.
2. **spec-names** — ran `check-spec-anchor-names.mjs --fix` to repoint 31 stale citations across `specs/hal-engine-session-resume/spec.md`, `specs/hal-engine-conversation-list/spec.md`, and `specs/hal-engine-websocket-protocol/spec.md` (all drifted when 17 lines were added earlier in `sessionResume.test.ts`).

0 tests written by me were failing; 0 regressions introduced. The DoD facets remain as they were — these were pure CI-red repairs, not new facet work.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI red: prefer-early-return lint + 31 stale spec anchor citations","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer.ts"}}