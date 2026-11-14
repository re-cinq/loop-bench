Refactored `src/transport/serverSessionList.test.ts` to use `captureErrors()` and `deferred()` with `try`/`finally` cleanup instead of the `beforeAll`/`afterAll`/`afterEach` teardown block duplicated from `src/transport/sessionResume.test.ts`, and updated both `#L11` spec anchors in `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`.

- Red tests: 0 ours, 0 regressions (CI failed at `eslint` `re-lint/no-duplicate-code`; `src/transport/serverSessionList.test.ts` passed locally).
- Unrelated smells: none noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve re-lint/no-duplicate-code in src/transport/serverSessionList.test.ts and update #L11 spec anchors","tdd_next":"acceptance green"}}