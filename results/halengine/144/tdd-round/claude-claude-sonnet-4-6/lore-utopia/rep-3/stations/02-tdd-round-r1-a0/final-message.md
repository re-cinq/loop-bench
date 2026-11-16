The push landed. Let me provide the final summary.

**What this round fixed:**

1. **TypeScript error** (`validation.test.ts:67`) — added `_description` as the second parameter to the `it.each` callback so its arity matches the 2-element tuple
2. **`re-lint/no-duplicate-code`** — extracted `eventually`, `delegatingTo`, and `teardownAfterEach` into `wsTestSupport.ts`; updated `conversationList.acceptance.test.ts` to import them, eliminating the blocks that were duplicated with `sessionResume.test.ts`
3. **`re-lint/require-spec-link`** — the ESLint rule couldn't find `#L163` for the third test because the spec said `#L161`; all three spec citations in `hal-engine-conversation-list/spec.md` were updated to their actual post-refactor positions (`#L72`, `#L113`, `#L142`)
4. **`spec-names` check** — same line-number fix resolves the `check-spec-anchor-names.mjs` failures
5. **`changelog`** — added entry under `[Unreleased] → Added` for the `list_sessions`/`session_list` WebSocket frames

**Unrelated smells noticed, not acted on:**
- `deferredRelease()` in `sessionResume.test.ts` is nearly identical to `deferred()` in `wsTestSupport.ts` — not currently flagged but a candidate for consolidation
- `startEngine` exists independently in both `conversationList.acceptance.test.ts` and `sessionResume.test.ts` with different signatures — same candidate

**Tests run this round:** `src/transport/ws/validation.test.ts` — 14 tests, all green. Acceptance tests are CI's to run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI failures: typecheck TS2345, eslint no-duplicate-code + require-spec-link, spec-names wrong line numbers, changelog missing entry","tdd_next":"Document list_sessions and session_list frames in specs/hal-engine-websocket-protocol/spec.md"}}