I have fixed the lint errors reported by CI:
1. In `src/orchestration/chatOrchestrator.ts`, I extracted the `ensureError` function to remove the nested `if` and `else` blocks that violated the `no-nested-if` and `prefer-early-return` lint rules.
2. In `src/orchestration/onErrorNonError.acceptance.test.ts`, I replaced the non-deterministic `new Date().toISOString()` with a fixed date string to satisfy the `no-nondeterministic-tests` rule.

The changes were formatted with `prettier`, committed, and pushed. Since no facets remained in `.lore/dod.md` and only the CI failures were pending, the next state is for the acceptance tests to be green on CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI lint failures","tdd_next":"acceptance green"}}