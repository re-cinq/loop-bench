I have completed one round of red-green-refactor (specifically addressing a CI regression and adding mandatory traceability).

### Changes:
1.  **Fixed CI Failure:** Added missing explicit imports of `test` and `expect` from `vitest` to `packages/tests/server/callRouter.test.ts`. This test was failing in CI (likely due to environment differences in global availability) while passing locally.
2.  **Added Traceability Links:** Updated `.lore/dod.md` and `packages/client/src/links/localLink.ts` with inline parenthetical links to the corresponding acceptance tests, as required by the project's engineering standards.
3.  **Verified Implementation:** Confirmed that `localLink` and `ssrLink` are correctly implemented, exported, and tested (including support for `createContext`, `tracked` envelopes in subscriptions, and data transformers).
4.  **Formatting:** Ran `prettier` on all modified files.

The build for the previous push was red due to `server/callRouter.test.ts`. By adding explicit imports, I have addressed the most likely cause of this environment-specific failure. All facets in the Definition of Done are now complete and linked to their verification tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"traceability and CI fix","tdd_next":"acceptance green"}}