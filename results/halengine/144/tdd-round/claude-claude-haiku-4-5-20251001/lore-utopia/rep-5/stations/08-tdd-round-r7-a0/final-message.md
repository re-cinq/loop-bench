Excellent! I've successfully fixed all three CI failures reported in the round-brief:

1. **Typecheck error** in `src/transport/wsTestSupport.ts(105,12)` — Fixed by updating the `servers` array type from a narrow `{stop: () => Promise<void>}` to the full `HalServer` type, which includes the `wss` property.

2. **Eslint spec-link errors** in `src/transport/sessionResume.test.ts` — Fixed by correcting line number references in the spec files (session-resume, conversation-list, and websocket-protocol). The test file line numbers had shifted by 1-2 lines from what the specs were pointing to.

3. **Spec-names check failures** — Fixed by ensuring all spec anchor links point to the correct line numbers using the spec-names checker's `--fix` tool.

All verification commands now pass:
- ✅ `npm run typecheck` (tsc --noEmit)
- ✅ `npm run spec:names`
- ✅ `npx eslint src/transport/sessionResume.test.ts` (no spec-link errors)

The acceptance tests in `.lore/dod.md` are already marked complete, and the code is ready for CI to verify the full build.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures fixed","tdd_next":"acceptance green"}}