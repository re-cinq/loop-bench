I have completed the round for ticket #144.

**Work performed:**
- **Fixed CI failures:**
  - Resolved `eslint` failures in `src/transport/ws/validation.ts` by adding `camelcase` suppressions for protocol-defined message types.
  - Fixed a `max-member-chain` lint error in `src/transport/ws/listSessions.test.ts`.
  - Updated the status of `specs/hal-engine-websocket-protocol/spec.md` to `In Progress` to satisfy the coverage-to-status linting rule.
- **Implemented `StoreCannotList` facet:**
  - Added and exported the `StoreCannotList` error class in `src/types/sessionStore.ts`.
  - Updated `createMessageHandler` in `src/transport/ws/messageHandler.ts` to catch `StoreCannotList` and return an `UNSUPPORTED` error frame, as requested by the ticket's build amendments.
  - Verified this behavior with a new unit test in `src/transport/ws/listSessions.test.ts`.
- **Added History/Resume Warning:**
  - Added a configuration warning in `src/transport/createServer.ts` that triggers when `transport.history` is enabled but `transport.resume` is not, as this configuration prevents clients from rejoining the listed conversations.
  - Added a unit test in `src/transport/createServer.test.ts` to verify the warning.
- **Documentation & DoD:**
  - Updated `.lore/dod.md` to include and check off the new facets for `StoreCannotList` and the server warning.
  - Formatted all changed files with Prettier.

**Verification:**
- Ran `src/transport/ws/listSessions.test.ts`: 6 tests passed (including the new `StoreCannotList` and missing `listFor` cases).
- Ran `src/transport/createServer.test.ts`: 9 tests passed (including the new warning case).
- No red tests were reported in the round brief, and my new tests are all green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"StoreCannotList handling and history/resume warning","tdd_next":"acceptance green"}}