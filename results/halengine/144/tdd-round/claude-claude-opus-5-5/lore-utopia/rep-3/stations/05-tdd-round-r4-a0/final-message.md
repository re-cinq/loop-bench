I fixed the two lint errors CI reported on `bf213d9` and pushed the fix; nothing else changed this round.

**What changed:** Both errors were at `src/transport/conversationList.acceptance.test.ts:68`, in the test's `askAfterConnect` helper. The previous round's fix had left a nested if/else in its message handler. I replaced it with two flat checks: a `pong` frame resolves and returns, and any frame other than `connected` is collected and returns. The handler behaves the same and no assertion was touched. This is the same kind of lint-only helper edit earlier rounds made to this file.

**Tests:** None ran here. The round brief named only the lint findings, so there was no failing test to write. The acceptance tests aren't run in this pod, so CI on this push will show whether the lint is clean.

**Red tests:** 2 lint errors, both in this ticket's own acceptance-test helper, and 0 regressions.

**Delivery:** Prettier left the file unchanged. I added a ticked entry for this fix to `.lore/dod.md`, then committed and pushed. Merging `origin/main` brought in nothing new, and the branch is level with `origin/loop-bench/144`.

**Next facet:** Document `list_sessions`/`session_list` in `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`.

**Mismatch with the ticket:** `.lore/dod.md` and its acceptance tests use the names `list_sessions`/`session_list` and answer an empty list when the store has no `listFor`. Issue #144 asks for `list_conversations`/`conversation_list`, an `UNSUPPORTED` error in that case, and a `transport.history` opt-in flag. I took no action on this.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI lint findings on bf213d9: no-nested-if and prefer-early-return in conversationList.acceptance.test.ts:68","tdd_next":"Document list_sessions/session_list in specs/hal-engine-conversation-list/spec.md and the protocol spec"}}