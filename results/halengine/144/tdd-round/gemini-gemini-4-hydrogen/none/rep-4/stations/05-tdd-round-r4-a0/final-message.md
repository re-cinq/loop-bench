Fixed the CI `typecheck` failure in `src/transport/ws/messageHandler.test.ts` (explicitly typed `(userId: string | number, options?: SessionListOptions)` on the mock `listFor` callback), documented `list_sessions` (§4.3) and `session_list` (§5.9) with trailing test citations in `specs/hal-engine-websocket-protocol/spec.md`, and marked the final facet complete in `.lore/dod.md`.

- `src/transport/ws/messageHandler.test.ts`: 55 passed, 0 failed (0 red tests, 0 regressions; the prior CI failure was a `TS7006` error on the new test added in the previous round, not a regression).
- `check-spec-links.mjs`, `check-spec-anchor-names.mjs`, `check-spec-status.mjs`, and `repoint-spec-anchors.mjs --check origin/main` all passed with 0 findings.
- Unrelated note: `CHANGELOG.md` line 16 under `SessionStore.listFor` still includes the sentence "Nothing in the engine calls it yet...", left untouched as out of scope.
- Committed (`6088423`), pushed to `origin/loop-bench/144`, and verified `origin/main` is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix typecheck error in src/transport/ws/messageHandler.test.ts and document list_sessions/session_list in specs/hal-engine-websocket-protocol/spec.md","tdd_next":"acceptance green"}}