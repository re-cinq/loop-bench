Round complete and pushed. Summary:

**Facet closed** — dod facet 2: `validateMessage` accepts `list_sessions` (dod facet 1's `ListSessionsMessage` came with it, as the validator's return type must live in the incoming union; its remaining types and the index re-exports stay open).

**The round**
- **RED**: one new test in `src/transport/ws/validation.test.ts:25` — accepts a bare/well-formed frame (dropping a client `userId`), rejects a malformed `limit` (`'ten'`, `-1`, `1.5`) and `before` (non-object, empty/129-char `sessionId`, unusable `updatedAt`, either half alone), each refusal naming its field. Failed for exactly the expected reason: `Unknown message type: list_sessions`.
- **GREEN**: `list_sessions` case in `src/transport/ws/validation.ts` plus additive `ListSessionsMessage` in `src/types/messages.ts` (wire `before` reuses the store's `SessionCursor`, whose string/number arms are what the frame can actually carry).
- **REFACTOR**: no extraction earned — the 128-char bound here is a length-only rule on a wire cursor, deliberately not the charset rule in `ws/helpers.ts`; noted, not coupled. Formatter run over the changed files (all unchanged); no lint/typecheck/build per pod rules; no CI brief existed and the gateway had no verdict for the branch, so nothing was owed from CI.
- **Traceability**: new §4.3 `list_sessions` in the protocol spec with four statements cited to the test (`#L25` lands on the `it(`); `repoint-spec-anchors.mjs` reports 721 up to date, 0 unresolved. It also surfaced three **rotten anchors the previous round left** in `specs/hal-engine-conversation-list/spec.md` (L87→93, L129→134, L161→163, names already correct) — fixed, since that gate blocks CI and it is this ticket's own spec.
- **Tests run here**: only my one file, 4/4 green. Red tests of mine remaining: 0. Regressions: 0.
- Pushed (`f90e944`), `origin/main` merged (already up to date), branch not ahead of upstream.

**Smells noticed, not acted on**: the two session-id length rules (above); `ListSessionsMessage.before` typed `SessionCursor` admits a `Date` arm that never occurs on the wire — facet 1's remaining dedicated wire payload types should narrow that.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames in src/transport/ws/validation.ts (optional non-negative integer limit, composite before cursor, client userId dropped), with its spec statements cited","tdd_next":"add SessionSummaryFrame and SessionListMessage wire types and re-export the three from src/index.ts (facet 1), then thread sessionStore into createMessageHandler (facet 3)"}}