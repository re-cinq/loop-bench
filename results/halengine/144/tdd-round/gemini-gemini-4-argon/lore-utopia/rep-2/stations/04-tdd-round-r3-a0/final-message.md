Resolved the three `eslint` findings reported by CI on the previous push:
- Flattened the `'pong'` early-return check in `askAfterConnect` in `src/transport/conversationList.acceptance.test.ts` (`re-lint/prefer-early-return`).
- Reused `baseSessionStore` from `src/transport/wsTestSupport.ts` inside `delegatingTo` in `src/transport/sessionResume.test.ts` (`re-lint/no-duplicate-code`).
- Repointed the shifted `sessionResume.test.ts` line numbers in `specs/hal-engine-session-resume/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`.

0 red tests were mine and 0 were regressions (CI only reported `eslint` findings; `src/transport/sessionResume.test.ts` passed all 25 tests).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve CI eslint prefer-early-return and no-duplicate-code findings","tdd_next":"acceptance green"}}