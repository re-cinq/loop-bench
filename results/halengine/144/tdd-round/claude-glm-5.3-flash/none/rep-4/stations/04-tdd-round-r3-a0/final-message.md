Round complete — branch `7ece869` is pushed and even with its upstream; origin/main merged clean (already up to date).

## What this round did

**CI's finding (the brief):** `conversationList.acceptance.test.ts` › *"answers an empty session_list when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws"* failed deep equality on the last push.

**Diagnosis.** The server answered a `ping` synchronously while a `list_sessions` sent *before* it waited on `await listFor` — so the `pong` always left the server before the list's answer. The acceptance helper collects frames until that pong, so it only saw the answer when the client happened to read both frames in one tick (fast machine); on CI's loaded machine the frames split and the assertion ran on an empty array. I confirmed with a scratch probe over real sockets (60/60 rounds pong-first; race fires whenever delivery splits). Tests 1 and 3 of the same acceptance file carried the same latent race and only passed by the same accident.

**The facet closed:** answers to non-turn frames on one connection leave in arrival order. Each non-turn answer now joins a per-socket tail in `createMessageHandler` (`src/transport/ws/messageHandler.ts:45`) — a list still never queues behind a turn, which the per-session lock alone serialises.

**Red→green:** one new test (`messageHandler.test.ts:726`, *answers a list_sessions whose store fails before the pong of the ping sent after it, in arrival order*) failed for exactly the overtaken-order reason, then the tail turned the file green — 56/56. Spec § 4.3 gained the ordering statement with its `([validated by: ...](...#L726))` citation; citation lines repointed by the repo's name-based fixer (9 shifted by my insertion), and the baseline repointer verified 721 anchors, 0 unresolved. `.lore/dod.md` gained the ticked facet.

**Red tests:** the one CI named — mine to make green this round. **Regressions:** 0. Ran no acceptance tests, lint, typecheck or build here (hook reserves them for CI; the push's build is the verdict).

**Noted, not acted on (out of scope):**
- The branch's shape diverges from the ticket: no `transport.history` opt-in, no `UNSUPPORTED`/`StoreCannotList`, and a store without `listFor` answers an empty list where the ticket's decision demands an `error` frame — the acceptance tests on the branch pin the empty list, so reconciling that is a deliberate later round, not a drive-by.
- `connectionHandler.ts:203` fires `handleMessage` without awaiting its promise; nothing rejects today because `wsErrorHandler` swallows, but that is load-bearing and unmarked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"answers to non-turn frames on one connection leave in arrival order (per-socket answer tail)","tdd_next":"ticket's opt-in criteria: transport.history gate and UNSUPPORTED error for a store without listFor (ticket wants an error, branch answers an empty list)"}}