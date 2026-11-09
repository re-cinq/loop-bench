Pushed — branch is even with its upstream, and `origin/main` is already an ancestor of HEAD, so no merge drift to resolve.

## Round summary

**The brief's named findings, all fixed:**
1. `validation.ts:21,23` camelcase — the dispatch table's `user_message`/`list_sessions` keys are now computed (`['user_message']`), which the rule passes and Prettier leaves alone (quoted keys alone would be stripped back by `quoteProps: as-needed`, verified against the installed ESLint and Prettier APIs).
2. `messageHandler.test.ts:873` max-expects — the list test's two expects merged into one object assertion.
3. The `test` step failure (its suite was unnamed in the truncated log) — **reproduced**: jest exits 1 with every test green, because `sessionSurvivesClose.test.ts` leaves its socket open past the run and `stopEngines` stopped the server without waiting, so the socket's late `close` logged `disconnected` through the restored default logger. I confirmed the same failure on an `origin/main` worktree — a latent race, not something this branch introduced — and fixed it by making `stopEngines` delegate to `drainClientsAndServers`, the drain this branch's repair already shipped for its own suites. The 11-suite set that previously exited 1 now exits 0 (103/103, no late log).

**Facets closed in `.lore/dod.md`:** the repair facet's second pass (above); the frame-naming question **settled for the branch** — the acceptance tests are the bar and may not be edited to match the ticket's prose, so `list_sessions`/`session_list`, always-on, ships and the ticket's `list_conversations`/opt-in/`UNSUPPORTED` criteria are recorded as superseded; and the ticket-level extras under that naming — `docs/getting-started.md` § Conversation List (prose: under always-on there is no config field, so `example/full-config.ts` is untouched and no generated block moves), the MINOR bump 0.5.0 → 0.6.0, and the retention note mirrored onto `SessionListMessage` (re-cinq/HALEngine#41).

**Red tests:** 0 mine, 0 regressions — the one reproduced red reproduces identically on main.

**Smells named, not acted on:** the off-lock ordering (a `list_sessions` answered during a streaming turn arrives before that turn's `stream_end`) is implemented but has no test — it would have been green on arrival, so it was not a TDD facet this round; the acceptance helper `askAfterConnect` has no timeout and would hang until jest's per-test limit on a missing frame; and one unreproduced `handshake.test.ts` 501 flake under extreme parallel load in this pod — three subsequent runs of the same set were clean. No acceptance test was run here; CI judges those.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"the red build CI named on 0edc35b: two camelcase keys, one max-expects, and the test step's exit-1 teardown race; plus the extras facet (docs § Conversation list, 0.6.0 MINOR bump, SessionListMessage retention note) and the frame-naming settled for the branch","tdd_next":"acceptance green"}}