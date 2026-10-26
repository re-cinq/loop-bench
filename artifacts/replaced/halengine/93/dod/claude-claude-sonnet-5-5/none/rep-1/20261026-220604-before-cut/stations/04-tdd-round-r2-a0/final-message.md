Branch is up to date and pushed. The fix addresses both CI failures:

1. **spec-links**: Split the compound bullet at spec.md:28 into three separate bullets — each citation now appears as the trailing parenthetical of its own statement (0 misplaced links confirmed by local check).

2. **eslint**: Added a new spec statement citing `chatOrchestrator.test.ts#L537`, giving that test the required spec link.

No regressions introduced — only `specs/hal-engine-config-hooks/spec.md` was changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI: split misplaced spec citation and add spec link for chatOrchestrator.test.ts:537","tdd_next":"acceptance green"}}