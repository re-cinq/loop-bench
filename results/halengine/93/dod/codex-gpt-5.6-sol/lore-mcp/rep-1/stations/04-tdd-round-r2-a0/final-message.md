Branch is up to date and pushed. Summary of this round:

- **CI failure fixed**: split `chatOrchestrator.test.ts:311` (2-expect test) into two single-expect tests — "non-Error rejection still reaches the caller" and "non-Error rejection bypasses onError and still reaches the caller" (0 regressions caused).
- **Facet closed**: exported `TurnUsage = UsageMetadata` from `chatOrchestrator.ts` and `index.ts`; renamed the `afterModelResponse` parameter from `usage` to `turnUsage` in the public interface so the type name itself communicates per-turn scope.
- **Traceability**: added spec statement + link for the TurnUsage test; updated the split-test link; ticked the facet in `.lore/dod.md`.
- All 27 tests pass locally.

Next round: keep the repository's build, test, typecheck, ESLint, and Prettier gates green (the final `- [ ]` facet, judged by CI).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Make the public hook signature unambiguously name the value as turn-total usage without introducing any","tdd_next":"Keep the repository's build, test, typecheck, ESLint, and Prettier gates green"}}