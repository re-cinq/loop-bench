Branch is even with origin/main and the push landed — `git status` reports the branch in sync with its upstream, nothing unpushed.

## Round report

**The brief's findings, verified against the current tree.** The verdict in the round brief was for `8ce28a5`; the branch's own repair commit `2ba525b` was already pushed on top of it, so I checked each finding rather than re-fixing blind:

- **typecheck** — repaired: `validation.ts` imports `SessionCursor` from `types/sessionStore.js`, which exports it.
- **eslint** (`re-lint/require-spec-link`) — repaired: every test eslint named carries a citation at exactly the line it named; `check:spec-links` reports 0 misplaced.
- **test** — the brief's details were cut off, but ts-jest type-checks per file, so the TS2459 failure reddened every suite importing `validation.ts`; the import fix repairs it. CI's run on my push confirms the rest.
- **spec-names** — passes (805 citations name their tests). **changelog** — entry present under `## [Unreleased]`.

**Facet closed: "Pin the off-lock answer with a test."** One test, `answers a list_sessions at once while a run is pending` (`src/transport/ws/messageHandler.test.ts:750`): the `list_sessions` send is awaited while a turn is parked at its gate, so if the frame ever queues behind the `PerSessionLock`, the await never resolves and the test times out red; the frames then hold `session_list []` ahead of that turn's `commit`/`stream_end`. It was green on first run — the previous round already answers lists off the lock, so this is a characterization pin, not new behaviour — and it is cited to § 4.3's off-lock statement, the one uncited statement in that section. Inserting it shifted nine citations pointing below it in that file; each is re-anchored to the line its test now starts on (verified by title→line, not arithmetic).

**Red tests of mine: 0. Regressions: 0** — nothing CI named was a regression, and all of it was already repaired on the branch before this round.

**Next facet:** § Conversation list in `docs/getting-started.md` via `example/full-config.ts` + `npm run docs:fix` (the last unchecked facet). Still owed a decision before any of it is built: the issue's opt-in `transport.history` / `UNSUPPORTED` / `StoreCannotList` versus the recorded acceptance tests' flag-less, empty-list answer — that divergence is logged in `.lore/dod.md` and must not be settled silently.

**Named smells, not acted on:** the protocol spec at HEAD is not prettier-formatted and the repo's `prettier` script covers only `src/**/*.ts`, so markdown drift has no owner (a whole-file reflow of it would be its own change); and `check-spec-links.mjs` catches links outside their parenthetical but not stale `#Lnn` targets — exactly the drift that reddened eslint on `8ce28a5` — so an anchor-by-title reanchor mode is owed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pin the off-lock list_sessions answer with a test (cited to protocol spec § 4.3, nine shifted citations re-anchored)","tdd_next":"§ Conversation list in docs/getting-started.md via example/full-config.ts + npm run docs:fix; then settle the recorded transport.history divergence in dod.md"}}