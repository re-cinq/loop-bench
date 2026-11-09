Pushed and confirmed: `611e529..e5dfd4c HEAD -> loop-bench/144`, merge with `origin/main` was already up to date, and `git status` shows the branch level with its upstream.

## Round summary

**What the round owed** (from the round brief — CI verdict on 611e529): 3 typecheck errors and 4 eslint errors. All fixed:

| Finding | Fix |
|---|---|
| `messageHandler.test.ts:877` implicit-`any` ×2 | typed the mock's params `(userId: string \| number, options?: SessionListOptions)` |
| `wsTestSupport.ts:125` `wss` missing on `{stop}` | registry typed `HalServer[]` instead of `{stop}` |
| `wsTestSupport.ts:125` 3-hop member chain | destructured `const {wss} = hal` before reading `clients.size` |
| `validation.ts:21,23` camelcase | validators table is now a `Map` keyed by string literals — quoting the object keys would have been undone by prettier's `quoteProps: "as-needed"` |
| `messageHandler.test.ts:873` no spec link | §4.3/§5.9 added to the protocol spec; the authorisation statement cites that test at its unchanged line |

**The facet** (dod #5, the last one): documented `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` (field tables, validation constraints, the authorisation rule, the failure answers). Every statement added carries a citation to an existing test except one new claim the previous round implemented but left unpinned — the off-lock answer — so I wrote its test: `answers a list_sessions while a run is pending, before that run sends stream_end`, mirroring the existing ping-at-once test. It passed on arrival (the code already routed lists through the second lock); it was inserted below every existing citation, so no anchor drifted — `repoint-spec-anchors.mjs` reports 0 repointed, 0 unresolved, and all three spec gates (`check:spec-links`, `spec:names`, `check:spec-status`) pass.

**Tests run here**: only `src/transport/ws/messageHandler.test.ts` — 56 passed. **Red tests: 0 mine, 0 regressions** — CI named no failing tests, only typecheck and eslint. Unrelated smells noticed, not acted on: `answerSessionList` has its own try/catch beside `wsErrorHandler`'s, two error paths sending the same wire frame; and the `sessionStore?.listFor?.()` optional chain conflates "no store configured" with "store without `listFor`", both answered as an empty list — a deliberate divergence from the ticket's `UNSUPPORTED`, recorded in this branch's dod, not mine to relitigate. Version bump, `docs:fix`, and the ticket's remaining acceptance criteria stay as the PR-stage work the dod's facet list doesn't carry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"facet 5: list_sessions and session_list documented in the protocol spec with citations, plus every typecheck and eslint finding from the last push repaired","tdd_next":"acceptance green"}}