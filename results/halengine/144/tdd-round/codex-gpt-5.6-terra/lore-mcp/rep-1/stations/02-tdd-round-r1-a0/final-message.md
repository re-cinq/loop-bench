Completed and pushed `9145b40`.

- Added store-backed `list_sessions` dispatch and ISO session-list serialization.
- Wired `sessionStore` through `createServer`.
- Fixed the validator type narrowing CI reported.
- Added/ran only `messageHandler.test.ts`: 55 passing.
- Red tests: 1 authored, 0 regressions.
- Next facet: error/missing-store handling documentation and remaining CI findings.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and createServer","tdd_next":"Handle list_sessions errors and document the protocol"}}