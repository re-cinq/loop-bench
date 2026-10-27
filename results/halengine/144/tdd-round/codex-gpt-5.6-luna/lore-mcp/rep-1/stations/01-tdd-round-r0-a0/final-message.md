Closed facet: `list_sessions` validation with typed message support, cursor/limit checks, test traceability, and DoD update.

- Test: 4 passed
- Commit pushed: `6ae784c`
- Branch synchronized with `origin/main`
- Red tests: 1 authored, 0 regressions
- Acceptance tests, lint, and typecheck were not run per instructions
- Noted discrepancy: ticket specifies `list_conversations`, while the current DoD/acceptance tests specify `list_sessions`

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Thread sessionStore into createMessageHandler"}}