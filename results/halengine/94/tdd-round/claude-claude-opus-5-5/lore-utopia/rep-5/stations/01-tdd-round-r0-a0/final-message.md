I moved the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`, so a throw from it now reaches the same `catch` and `finally` as any other failure in the turn. The commit is pushed and the branch is already up to date with `origin/main` and not ahead of its upstream.

- **Red:** I added one test, `receives the error a beforeSession hook threw`, in `src/orchestration/chatOrchestrator.test.ts:284`. It failed for the expected reason: `onError` got `undefined` because it never ran.
- **Green:** I only moved the line. All 24 tests in `chatOrchestrator.test.ts` pass, including the 23 that were already there, unedited.
- **Refactor:** there was nothing to clean up in a two-line move.
- **Acceptance test:** I didn't run it (CI does). It also expects `afterSession` to run, and the `finally` block now covers that, so it should go green on this push.
- **Red-test count:** 1 red test, mine (now green), and 0 regressions. There's no round brief and no CI verdict yet on this push, so I can't confirm the second number from CI.
- **Traceability:** I added a link to the new test on the existing `beforeSession` line in `specs/hal-engine-config-hooks/spec.md:26`, and `scripts/check-spec-links.mjs` reports nothing out of place. Nothing in the repo stamps spec anchors on tests (`scripts/lore-list-tests.mjs` has no spec field), so none was stamped.
- **`.lore/dod.md`:** I ticked the "move `beforeSession` inside the `try`" facet and added a new one. That spec line still sits under "Measured semantics — out of scope", whose intro says this issue changes none of them. It needs to move out of that section and say what `afterSession` can assume when `beforeSession` failed.

**Next round:** rewrite the spec section for the new guarantee, then write the CHANGELOG entry.

**Unrelated things I noticed but didn't touch:**
- `scripts/lore-list-tests.mjs` gives tests no `spec` field, so `VALIDATED_BY` links can't be set up automatically.
- The two links in `spec.md:27-28` point at lines of the source file (`chatOrchestrator.ts#L150` and `#L148`) rather than at tests. They still point at the right lines after this change, but they'll drift on the next edit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee (move it out of Measured semantics) and document it in the CHANGELOG"}}