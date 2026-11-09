Pushed and landed: `e2dd0f4 docs(transport): spec the list frames` — branch up to date with `origin/loop-bench/144`, and `origin/main` merges clean (already up to date).

## This round

**Owed CI repairs first** — all 7 eslint findings from the round brief, fixed by editing only those sites:
- `validation.ts` camelcase ×2 — the validator lookup became a `Map` (quoting the record's keys would not have survived Prettier's `as-needed`, so the keys became array-element literals instead of property identifiers)
- `conversationList.acceptance.test.ts` nested-if + else — `askAfterConnect` now resolves on `pong` and records the ask in sibling guards; each block stays under the wrapped-happy-path threshold
- the 16-line clone between the acceptance test and `messageHandler.test.ts` — collapsed into `DATED_SUMMARY` / `DATED_SUMMARY_ON_WIRE` fixtures in `wsTestSupport.ts`, the wire row derived from the store row so the two cannot drift
- `wsTestSupport.ts` member chain — `stopEngines` binds `hal.wss.clients` locally

**Facet 5 closed** — `specs/hal-engine-websocket-protocol/spec.md` now has §4.3 `list_sessions` (field table, constraints, the authorisation rule: the user id is the connection's, never the frame's) and §5.9 `session_list` (field table, the GDPR note, empty list for a store without `listFor`, `SERVER_ERROR` for a rejecting one), plus a security-considerations bullet. All citations name existing tests; `spec:names` (810 clean), `repoint --check origin/main`, `spec:links` and `spec:status` all pass locally. `.lore/dod.md` ticked, and its two stale inline pointers repaired.

**Tests**: I ran only the two unit files my refactor touches — `messageHandler.test.ts` + `validation.test.ts`, **59/59 green**. The acceptance suite was not run here (its file is CI's to judge); its edits are value-identical fixture swaps and a semantics-preserving guard restructure. Red tests: **0 mine, 0 regressions** — CI's verdict named lint only, no failing tests. I ran no lint/typecheck/build in this pod, per contract.

**Next facet**: 7 — MINOR version bump (0.5.0 → 0.6.0, new protocol frames).

**Named, not acted on** (out of scope): ticket.md's criteria for `transport.history` opt-in, `UNSUPPORTED`/`StoreCannotList`, and the `docs/getting-started.md` + `full-config.ts` regeneration diverge from this branch's dod and its already-green acceptance tests (which pin empty-list/`SERVER_ERROR` and no config flag) — the dod is the brief, so I documented what the code does, but the divergence is worth a deliberate decision on a later round. Also noticed: `messageHandler.ts` `handlePing` bypasses `sendJson` with an inline `JSON.stringify`, and the acceptance suite's `Frame` interface duplicates `SessionSummaryFrame` structurally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"facet 5 — list_sessions/session_list documented in the protocol spec, plus all 7 owed eslint repairs","tdd_next":"facet 7 — MINOR version bump"}}