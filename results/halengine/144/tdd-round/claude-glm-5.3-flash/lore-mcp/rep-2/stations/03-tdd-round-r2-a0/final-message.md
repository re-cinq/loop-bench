Pushed and in sync: `loop-bench/144` is at `b444080` on its upstream, and `origin/main` merged clean (no drift, no second push needed).

## Round summary

**CI verdict owed (before anything else):** the round brief named two `eslint` findings — `camelcase` on the `validators` record's `user_message` and `list_sessions` keys, introduced by the previous round's lookup-table refactor. Quoting the keys was not an option: prettier's default `quoteProps: as-needed` strips them right back (verified locally), so the table became a `Map` keyed by the wire's string literals — the rule selects only identifier keys, the one-row-per-frame design survives, and no behavior changes.

**Facet closed** (the last open one in `.lore/dod.md`): a socket that closed before its `list_sessions` answer is ready neither sends nor logs a failure.
- Red first: `sends nothing and logs no failure when the socket closed before its list answer was ready` in `src/transport/ws/messageHandler.test.ts:797` failed with `list s0` written to the closed socket; the other 55 tests in the file stayed green.
- Green with the least code: a `readyState !== WebSocket.OPEN` guard in `handleListSessions` (`src/transport/ws/messageHandler.ts:144`) drops the finished answer with an info log naming the session id only. It checks `readyState` alone, matching the existing decision that non-turn answers ignore the connection signal.
- Nothing to refactor — the guard mirrors the `answerInTurn` convention.

**Traceability:** spec statement added in §5.9 of `specs/hal-engine-websocket-protocol/spec.md` with the `validated by` citation; the 80 `#Lnn` citations my insertion shifted were repointed by the repo's own `check-spec-anchor-names.mjs --fix` (801 now name their tests), and CI's `repoint-spec-anchors.mjs --check origin/main` passes clean (stale 0, unresolved 0, mislabelled 0).

**Test runs here:** only `src/transport/ws/messageHandler.test.ts`, twice (red, then green — 56/56). No eslint, no tsc, no build, no acceptance suite — CI judges those. Red tests this round: 1, mine (made green before the push). Regressions: 0.

**Smells noticed, not acted on:** the `catch` in `handleListSessions` still logs a store failure and attempts `sendError` on a socket that may have closed (a store failure is genuine; the send is a silent no-op in real `ws`); `handlePing` likewise sends unconditionally, per the existing aborted-signal ping test.

**One observation for the ticket's trail:** the issue text's criteria (opt-in `transport.history`, `StoreCannotList`, `UNSUPPORTED`) diverge from this branch's dod.md, which records a deliberately narrower contract (a store without `listFor` answers an empty `session_list`). I followed the dod.md brief; if the fuller contract is still wanted, it needs a facet written into dod.md first.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pin: a socket closed before its list_sessions answer is ready neither sends nor logs it as a failure of a dead socket","tdd_next":"CI's verdict on this push — the eslint findings it named are repaired; if green, acceptance green"}}