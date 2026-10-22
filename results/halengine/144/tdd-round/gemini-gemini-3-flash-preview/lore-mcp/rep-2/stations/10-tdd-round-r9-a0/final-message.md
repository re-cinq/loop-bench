In this round, I resolved the CI failures and implemented the final missing behavioral requirement for ticket #144.

**Phase 1: Fix Existing Failures**
I addressed the ESLint and Prettier failures in `src/transport/ws/messageHandler.test.ts` reported by the previous CI run. I moved the `run` variable declaration closer to its use to satisfy the statement-limit rule and replaced `any` casts with `unknown` as per the project's engineering standards.

**Phase 2: TDD Round (Startup Warning)**
I implemented the mandatory startup warning for the deployment slip where `transport.history` is enabled but `transport.resume` is not.
1.  **Red:** I added a failing test in `src/transport/createServer.test.ts` that captures logger output and expects a specific warning message under the `server` category.
2.  **Green:** I implemented the check in `src/transport/createServer.ts` using the project's shared logger.
3.  **Refactor:** I ensured the implementation was clean and minimal.

**Phase 3: Traceability and Documentation**
I updated `specs/hal-engine-websocket-protocol/spec.md` to include the warning requirement and cited the new test. I also manually updated several "rotten" anchors in `specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-abandon-on-close/spec.md`, and `specs/hal-engine-tool-executor-throw/spec.md` that had shifted due to the changes in `messageHandler.test.ts`, restoring full traceability for the project. Finally, I added and ticked the new facet in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Emit a warning when history is enabled without resume","tdd_next":"acceptance green"}}