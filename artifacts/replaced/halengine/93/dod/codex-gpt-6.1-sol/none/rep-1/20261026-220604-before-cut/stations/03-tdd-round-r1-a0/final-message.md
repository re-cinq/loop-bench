Branch is current. Fixed all 6 ESLint errors and the changelog check:

- `spec.md:6` — changed status "Shipped" → "In Progress" (8/10 statements linked; two more statements need links before re-marking shipped)
- `chatOrchestrator.acceptance.test.ts:45` — refactored `if/else` to `if/if(!)` per `prefer-early-return` rule
- `orchestratorHelpers.test.ts:31,35,39,43` — added validated-by links in spec.md pointing to all four `accumulateUsage` unit tests
- `CHANGELOG.md` — added "Changed" entry for `afterModelResponse` now receiving the turn total

Ticked DoD facet 2 (no-tool test green, confirmed by CI showing only eslint/changelog failures, no test failures). Facets 3 (public signature type annotation) and 4 (spec remaining 2 statements + version bump) remain open for the next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint prefer-early-return and require-spec-link violations plus changelog gap","tdd_next":"Make the public hook signature explicitly identify usage as the turn total, with no any; retain the existing single argument shape"}}