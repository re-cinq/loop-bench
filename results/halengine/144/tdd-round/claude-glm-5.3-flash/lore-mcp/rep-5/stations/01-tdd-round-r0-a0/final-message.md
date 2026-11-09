Round complete — pushed as `ebaee97`, branch up to date with `origin/loop-bench/144`, `origin/main` already contained.

## This round

**Facet closed (dod #2): `list_sessions` validation.** One test written, red for the right reason (`Unknown message type: list_sessions`), then the least code:
- `src/transport/ws/validation.ts` — a `list_sessions` case: `limit` present must be a non-negative integer; `before` present must be an object with a 1–128 char `sessionId` and an `updatedAt` that is a `Date.parse`-able string or finite number (either half alone refused); any other field — a client `userId` included — is dropped, and only `type`/`limit`/`before` are forwarded.
- `src/types/messages.ts` — `ListSessionsMessage` added to `IncomingMessage`, additive only; re-exported from `src/index.ts` and `src/types/index.ts`.
- Post-refactor bar: `validation.test.ts` 4/4 green (my test + the three untouched). Ran nothing else — no acceptance tests, no lint, no typecheck, no build; CI judges those.

**Traceability:** §4.3 `list_sessions` added to `specs/hal-engine-websocket-protocol/spec.md` (frame, field table, constraints), every statement citing its test; the user-id rule cites acceptance test 1. `spec:names:fix` then repaired three stale `#Lnn` anchors the previous round's acceptance-test edits had left in the conversation-list spec (L87→93, L129→134, L161→163). Facet #2 ticked in `.lore/dod.md`.

**Red test accounting:** 3 acceptance tests remain red — the ticket's own RED tests, next rounds' work; 0 regressions; CI has produced no verdict on this branch yet (lore: branch not found).

**Deliberately not written:** `SessionSummaryFrame`/`SessionListMessage` — no failing test drives them yet; they land with the handler round (noted in dod.md), which also threads `sessionStore` into `createMessageHandler` and answers a valid frame with `session_list` (dod facets 3+4, then facet 5's `session_list` docs; CHANGELOG/docs:fix/version bump remain for the closing rounds).

**Smells noted, not acted on:** `src/types/index.ts` barrel omits `SessionListOptions`/`SessionCursor`/`SessionSummary` (#143 exported them from `src/index.ts` only); the validator accepts any non-negative `limit` while the store caps at 200 — the cap lives only in the store, untested at the wire.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"thread sessionStore into createMessageHandler and answer a valid list_sessions with session_list (dod facets 3+4)"}}