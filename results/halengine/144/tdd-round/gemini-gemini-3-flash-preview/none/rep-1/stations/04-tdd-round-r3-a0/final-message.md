I have cleared all CI findings reported in the round brief, including typecheck, ESLint, and specification traceability failures.

### Findings Resolved:
- **Typecheck**: Fixed a `TS2559` error in `src/transport/conversationList.acceptance.test.ts` by removing an invalid `'u1'` argument from `startEngine`. Fixed `TS2722`/`TS18048` errors in `src/transport/ws/messageHandler.ts` by adding a non-null assertion to `sessionStore.listFor!`, which is guaranteed by a check in the caller.
- **ESLint (`re-lint/require-spec-link`)**: Added missing `[validated by]` citations to `specs/hal-engine-websocket-protocol/spec.md` for thinking-tag and tool budget tests in `src/transport/ws/messageHandler.test.ts`.
- **`spec-links`**: Fixed misplaced links in `specs/hal-engine-websocket-protocol/spec.md` by splitting a multi-link sentence so each citation sits in its statement's trailing parenthetical.
- **`spec-names`**: Fixed drift across 46 citations in 7 specification files (`specs/hal-engine-abandon-on-close/spec.md`, `specs/hal-engine-commit-open-entries/spec.md`, `specs/hal-engine-conversation-list/spec.md`, `specs/hal-engine-session-resume/spec.md`, `specs/hal-engine-single-terminal-frame/spec.md`, `specs/hal-engine-tool-budget/spec.md`, and `specs/hal-engine-tool-executor-throw/spec.md`). Every link now correctly names its test and points to its current line number.

### Verification:
- **Tests**: Ran `npx jest src/transport/ws/messageHandler.test.ts`; all 58 tests passed.
- **Traceability**: Ran `npm run spec:names` (806 citations verified) and `npm run check:spec-links` (0 misplaced links); both checks passed.
- **Documentation**: Verified that `example/full-config.ts` and `docs/getting-started.md` correctly reflect the new `transport.history.enabled` option.

The branch has been merged with `origin/main` and pushed. All facets in `.lore/dod.md` are closed, and the build should now proceed to green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"all CI findings cleared","tdd_next":"acceptance green"}}