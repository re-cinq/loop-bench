Branch is up to date. The push landed cleanly.

Fixed all 4 ESLint errors from the CI failure:
- **3 `require-spec-link` errors** in `orchestratorHelpers.test.ts` (lines 13, 17, 21): added corresponding spec statements in `specs/hal-engine-architecture/spec.md` linking to the `accumulateUsage` unit tests
- **1 `max-expects` error** in `turnUsage.acceptance.test.ts` (line 54): merged the 2 `expect` calls into a single `toMatchObject` call, then updated the stale `#L61` → `#L64` spec link after Prettier expanded the block

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI: resolve 4 eslint errors (3 missing spec links + 1 max-expects)","tdd_next":"acceptance green"}}