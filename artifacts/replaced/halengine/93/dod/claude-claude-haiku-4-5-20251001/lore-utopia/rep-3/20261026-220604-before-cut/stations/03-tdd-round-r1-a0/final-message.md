Branch is pushed and up to date. This round fixed all 7 CI ESLint failures by:
- Extracting `makeOrchestrator` and `captureUsage` helpers (eliminated `no-duplicate-code` violations)
- Reducing the 5-expect test to a single `toEqual` (fixed `max-expects`)
- Adding spec links for all four acceptance tests (fixed `require-spec-link`)
- Adding a one-line JSDoc to `afterModelResponse` making summing semantics explicit (closed the type-signature facet)

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix lint errors in acceptance tests + type-signature JSDoc","tdd_next":"acceptance green"}}