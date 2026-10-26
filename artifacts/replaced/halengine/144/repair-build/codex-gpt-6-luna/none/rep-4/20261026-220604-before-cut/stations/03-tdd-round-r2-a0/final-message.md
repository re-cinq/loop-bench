The CI failures were all stale spec-link line numbers. The previous round added new tests to `sessionResume.test.ts` which shifted every existing test down by ~18 lines, breaking the `([validated by: ...](test.ts#Lnn))` citations in three spec files. I:

1. Updated all ~25 citations in `specs/hal-engine-session-resume/spec.md` via `sed` to use correct line numbers
2. Ran `node scripts/check-spec-anchor-names.mjs --fix` which corrected 6 more stale anchors in `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`
3. Both `spec:names` and `check:spec-links` now pass clean

Unrelated smell noticed: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reanchor stale spec-link line numbers after sessionResume.test.ts line shift","tdd_next":"acceptance green"}}