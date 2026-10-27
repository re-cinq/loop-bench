Implemented and pushed one TDD round:

- Threaded `sessionStore` into `createMessageHandler`.
- Added list dispatch with authenticated user scoping and ISO serialization.
- Added focused regression test; it passes.
- Repaired reported CI traceability/style/changelog issues.
- Updated DoD and pushed commits `3401d13`, `315cf88`.
- Branch is up to date with upstream.

No acceptance suite, lint, typecheck, or full suite was run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler","tdd_next":"Handle list_sessions in messageHandler and sender"}}