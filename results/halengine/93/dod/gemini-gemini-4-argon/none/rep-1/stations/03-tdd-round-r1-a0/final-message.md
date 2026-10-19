Branch is up to date. The push landed cleanly.

**What this round did:**
- Fixed all 3 CI failures from the previous push: duplicate `scriptedProvider` code (extracted to `chatOrchestrator.test-helpers.ts`), missing spec links for `accumulateUsage` unit tests (added 4 spec statements to `hal-engine-config-hooks/spec.md`), and missing CHANGELOG entry
- Updated acceptance-test spec links (L48→L36, L77→L65) and reanchored 9 architecture/tool-input-validation spec links shifted by extracting the helper
- Ticked DoD facet 3 (spec + changelog)

**Unrelated smell noted:** The architecture spec line 221 still says "the usage the provider reported" which is now slightly misleading for multi-round turns — but it's factually correct for single-round turns and didn't cause a CI failure, so left for the next round (facet 2).

**Next round:** Close facet 2 — add a one-line JSDoc to `afterModelResponse` in `chatOrchestrator.ts` and update the two `OrchestratorHooks` doc-blocks in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md` to match.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md and CHANGELOG.md (facet 3); fix eslint duplicate-code and spec-link CI failures","tdd_next":"Make afterModelResponse type/docs unambiguous (facet 2): add one-line JSDoc in chatOrchestrator.ts, update OrchestratorHooks doc-blocks in CLAUDE.md and specs/hal-engine-architecture/spec.md"}}