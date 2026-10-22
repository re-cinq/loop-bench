I have completed the round for ticket #144. This round focused on fixing the CI failures (typecheck and ESLint) introduced by the previous round and completing the remaining ticket requirements regarding the GDPR retention note and documentation.

### Changes Made:
- **CI Fixes:**
  - In `src/transport/ws/listConcurrency.test.ts`, I added type assertions to the `sent.map` calls to fix the `unknown` type error (TS18046) reported by the typechecker.
  - In `src/shared/logger.ts`, I reordered the `probe` and `serialise` functions to place them below their callers, satisfying the `re-lint/callee-below-caller` ESLint rule. I also moved the `no-console` suppression comment to correctly apply to the console calls.
- **GDPR & Documentation:**
  - Added the mandatory GDPR retention note to the `history` option in `HalEngineConfig` (within `src/config.ts`) and mirrored it in the `example/full-config.ts` example.
  - Fixed formatting issues in `docs/getting-started.md` where blank lines between `doc-block` markers and code fences were preventing `npm run docs:fix` from working.
  - Successfully ran `npm run docs:fix` to regenerate the documentation blocks.
- **Traceability:**
  - Verified that all spec statements carry the required citations and that `check:spec-links`, `check:spec-status`, and `spec:names` pass.

The round is complete as all facets in `.lore/dod.md` are now correctly implemented and the CI blockers have been addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures and add GDPR note","tdd_next":"acceptance green"}}