Branch is up to date. The fixes delivered this round:

1. **TypeScript error** (`TS2304: Cannot find name 'eventually'`): Added `eventually` to the import from `./wsTestSupport.js` in `sessionResume.test.ts`.
2. **ESLint spec-link errors** (lines 233, 281, 392, 440, 476, 528, etc.): Ran `spec:names --fix` which repointed 31 stale spec citations across 3 spec files (`hal-engine-session-resume`, `hal-engine-conversation-list`, `hal-engine-websocket-protocol`) — all shifted by 11 lines from a prior round's test insertions.
3. **spec-names CI failure**: Same fix resolves this — the script now finds all 800 citations correctly named and pointed.

No regressions introduced; 0 new tests written (this was a CI-repair round). No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI typecheck/eslint/spec-names failures from missing eventually import and stale spec citations","tdd_next":"acceptance green"}}