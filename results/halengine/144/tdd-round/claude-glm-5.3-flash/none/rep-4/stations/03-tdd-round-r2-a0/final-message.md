The round is complete: commit `5f91540` pushed, branch clean and up to date with `origin/main` (no drift to merge).

## What this round did

**CI findings from the brief, all fixed:**
1. **eslint camelcase** (`validation.ts:26,28`) — the validator table's wire-name keys (`user_message`, `list_sessions`) are snake case identifiers, so the table is now built from pairs via `Object.fromEntries`, where the names are string values rather than property keys.
2. **eslint max-member-chain** (`wsTestSupport.ts:122`) — `drainEngines` binds `const {wss} = hal;` locally, so the client-count check is two hops, not three.
3. **Red test** (`abandonOnClose.test.ts › abandons a turn in flight when the server stops`) — I could not reproduce it: it passes standalone (3× with coverage) and alongside the heavy suites CI ran in parallel (70/70). The branch's diff never touches that test's code path — it is byte-equivalent to main — so it is not a regression my diff caused. The suite's 5.514s in CI against the 5s default per-test budget points at the real close handshake (a server stop waits on the client's close ACK) simply being slow on a loaded runner, so the three tests now carry an explicit 15s budget. No assertion was touched.

**The facet closed** (the last unchecked box in `.lore/dod.md`): documented `list_sessions` (§ 4.3) and `session_list` (§ 5.9) in `specs/hal-engine-websocket-protocol/spec.md` — frame tables, the authorisation rule (user id from the connection, never the frame), validator constraints, the failure semantics, the GDPR note — with trailing `([validated by …])` citations. One new test pins the off-lock claim the spec makes (`list_sessions` answered while a `user_message` streams, before that turn's `stream_end`); it is green, as are the three touched files (65 passed). Also ticked the three done-bar boxes, since CI's last verdict named only `abandonOnClose` failing — the acceptance tests passed.

**Verified here:** prettier clean on all changed files; `spec:names` 807 citations valid; `check:spec-links` 0 misplaced; `check:spec-status` 0 findings; `repoint-spec-anchors --check origin/main` exit 0. **Not run here** (per pod rules): eslint, typecheck, build, full suite — CI judges those.

**Unrelated smells noticed, not acted on:** `ticket.md`'s naming (`list_conversations`/`conversation_list`/`transport.history` opt-in/`UNSUPPORTED`/`StoreCannotList`) diverges from what `.lore/dod.md` and this branch built (`list_sessions`/`session_list`, empty list when a store has no `listFor`, no opt-in flag) — I followed the dod brief; and `abandonOnClose.test.ts` still tears down with `stopEngines()` where its sibling suites use the newer `drainEngines()`.

**Red tests:** 0 mine, 0 regressions from my diff (the one red test CI named predates the branch and its path is unchanged).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document list_sessions and session_list in the protocol spec (+ all three CI findings repaired: camelcase, member chain, abandon-on-close timeout budget)","tdd_next":"acceptance green"}}