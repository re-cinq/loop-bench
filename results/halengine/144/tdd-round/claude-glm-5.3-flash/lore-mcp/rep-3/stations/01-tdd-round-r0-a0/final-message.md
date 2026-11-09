Round complete. The branch is pushed, up to date with its upstream, and already contains the latest `origin/main` (merge was a no-op).

## What this round did

**Facet closed (dod facet 2): `list_sessions` frame validation.** One red-green-refactor pass:
- **RED** — one new unit test in `src/transport/ws/validation.test.ts:24`: accepts a bare frame, a non-negative integer `limit` (0 included), a `before` cursor with `sessionId` 1–128 chars and a string-or-finite-number `updatedAt`; drops extra fields such as a client-supplied `userId`; refuses the eight malformed shapes with a message naming `limit` or `before`. It failed for the expected reason (`Unknown message type: list_sessions`).
- **GREEN** — additive `ListSessionsMessage` in `src/types/messages.ts` (one union member, no existing line touched) and a `list_sessions` case in `src/transport/ws/validation.ts` with a `parseCursor` helper. Test file green 4/4 (the three pre-existing tests included).
- **REFACTOR** — nothing needed: the new validator follows the file's existing check-then-return shape and the test is one table.

**Traceability** — split the validator statement in `specs/hal-engine-conversation-list/spec.md` § Over the WebSocket protocol: the validator half now cites my unit test; the end-to-end half keeps the acceptance test. Ticked the dod facet box.

**Repair owed by the branch itself** — the spec's three citations of `conversationList.acceptance.test.ts` pointed at lines that are not test declarations (stale since the test file grew); `npm run spec:names` would have failed this branch on any push. Repointed them with the repo's own `spec:names:fix` (#L87→#L93, #L129→#L134, #L161→#L163). No CI-checklist tool beyond that traceability gate was run here; the round ran only its own test file, and the acceptance tests were left for CI.

**Red tests:** 0 mine, 0 regressions — the three red tests on the branch are the committed acceptance tests, untouched.

**Named, not acted on:** the ticket prose and this branch's dod disagree — the ticket says `list_conversations`/`conversation_list`, an opt-in `transport.history` flag, `UNSUPPORTED`/`StoreCannotList`, and off-lock answering; the dod and committed acceptance tests say `list_sessions`/`session_list`, an empty list when `listFor` is absent, and `SERVER_ERROR` on throw. I followed the dod (it is the bar), so the ticket's extra criteria (opt-in flag, UNSUPPORTED, StoreCannotList, non-locked path, protocol-spec/CHANGELOG/docs work) would need their own dod facets and acceptance tests before anyone builds them. Also noted: `src/transport/createServer.ts:43` still constructs `createMessageHandler` with the orchestrator only — that call site is exactly next round's facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames in src/transport/ws/validation.ts (dod facet 2)","tdd_next":"thread sessionStore into createMessageHandler and wire createServer (dod facet 3), completing the outgoing message types (facet 1) on the way"}}