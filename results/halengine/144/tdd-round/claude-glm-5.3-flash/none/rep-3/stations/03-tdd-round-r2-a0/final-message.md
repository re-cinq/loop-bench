The round is complete and pushed. Summary of what happened:

**The CI findings from the brief (all fixed):**
- **typecheck** `validation.ts(121,5)` — `limit` was `unknown` narrowed only to `{}` inside a conditional spread; the frame is now built as a typed `ListSessionsMessage` with `isListableLimit` turned into a type guard.
- **camelcase** (22, 24) — the dispatch map's snake_case wire-type keys became a `Map` of string literals (quoting wouldn't survive Prettier's `quoteProperties: as-needed`).
- **callee-below-caller** (80, 84, 89) — the cursor helpers now sit below their callers.
- **no-flag-params** `listSessions.test.ts:85` — the mid-turn race names its loser (`'in-time'`/`'late'`) instead of signalling through booleans.
- **max-member-chain** `wsTestSupport.ts:121` — the drain teardown reads the server's client set in one hop.
- **test** (`optionalPeers.test.ts`) — its `beforeAll` shells out to `npm run build`, which failed on that same type error; fixing the type error heals it.

**The facet this round closed (red → green):** probing the acceptance exchanges over a real socket showed `pong` overtook `session_list` in **40/40** runs — the synchronous ping answer beat the async list answer, and since all three acceptance tests resolve on that pong as a completion barrier, the whole bar was red. No spec promises cross-frame ordering, but arrival-order answering (already guaranteed for `user_message`s) is the coherent contract, so off-lock frames now answer through their own per-session queue beside the turn lock — a list still never waits behind a streaming answer. The new unit test ran red, then green; after the fix the probe reads **40/40 `session_list` then `pong`**, and all 78 tests in the four touched suites pass. Spec § 5.9 gained the statement with its citation; `re-lint-reanchor` and the three spec checkers pass clean.

**Red tests:** 1 was mine (the new arrival-order test, red by design, now green). **Regressions: 0.**

**Flagged, not acted on:** the ticket's `transport.history` opt-in (answering `UNSUPPORTED`/`StoreCannotList`) — the previous round named it next, but the acceptance bar's engines start with no transport option and expect `session_list` answers, so a default-off flag reddens all three tests. Recorded in `.lore/dod.md` as an unchecked facet requiring the ticket owner's call. The throwaway probe script lives outside the repo and is not committed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"off-lock frames answer in arrival order per session (the acceptance pong barrier), plus every typecheck/eslint/test finding from the last push","tdd_next":"acceptance green — CI verdict on this push; transport.history opt-in flagged in dod.md as the ticket owner's call"}}