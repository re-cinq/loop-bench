Round closed the first facet: `beforeSession` now runs inside the `try`, so a throw reaches `onError` and `afterSession`. The commit is pushed to `loop-bench/94`, and the branch is in sync with its upstream after merging `origin/main` (no new commits from the merge).

**What I did**
- **Red:** added `a throw from beforeSession reaches onError with the same error` to the `beforeSession` block in `src/orchestration/chatOrchestrator.test.ts`. It failed with `receivedError: undefined`, as the ticket describes.
- **Green:** moved the `beforeSession` call inside the `try` in `chatOrchestrator.ts`. The new test passes, and the other 23 tests in that file still pass.
- **Refactor:** nothing to clean up at this size. Prettier ran over both changed source files and left them unchanged.
- **Checklist:** ticked the first facet in `.lore/dod.md`.

**What I did not do**
- I did not run the acceptance test `chatOrchestrator.beforeSession.acceptance.test.ts`, per the brief. Its `afterSession` half should now be green; CI will confirm.
- The spec and CHANGELOG facets are still open. Those are the next two rounds.
- No `round-brief.md` existed, so there was no CI verdict to work from.
- The `lore_*` tools were not available in this session, so I could not query `tests_covering` before editing. I checked the test file layout and the spec by reading them.
- No lint, typecheck, or build ran here, per the brief.
- Red tests: none known. I caused no regressions that I can see locally.

**Unrelated issues I noticed, not touched**
- `chatOrchestrator.ts` gates `onError` on `error instanceof Error`. The ticket puts this out of scope.
- `afterModelResponse` passes only the last round's usage. This is HALEngine#93.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}