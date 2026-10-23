Round 1 is done: facet 1 is closed and pushed. The `beforeSession` call now sits inside the `try`, so a throw from it reaches `onError`.

**What changed**
- `src/orchestration/chatOrchestrator.ts`: the `beforeSession` await moved from above the `try` to its first statement. A non-throwing hook runs exactly as before.
- `src/orchestration/chatOrchestrator.beforeSessionOnError.test.ts` (new): one test, "hands the thrown error to onError". I wrote it red first (`onError` received `undefined`), then green after the move.
- `.lore/dod.md`: ticked the facet 1 box.
- Committed as `a0c44fd` and pushed to `loop-bench/94`. The branch is not ahead of its upstream. `origin/main` was already contained in HEAD, so the merge produced nothing.

**Not done this round**
- Facets 2 and 3 are open: the spec update in `specs/hal-engine-config-hooks/spec.md` (including the `afterSession` guarantee and the "never allocated vs. allocated" decision) and the CHANGELOG entry.
- The `afterSession` assertion in the acceptance test is not covered by my new test. It should now pass via the existing `finally`, but CI has to confirm it.
- My new test has no spec anchor or inline spec link yet, because the spec statement it validates doesn't exist until facet 2.

**Tooling caveats**
- The Lore MCP server failed to connect (`CONNECTION_CLOSED`). I could not run the `lore-query-trace` coverage check before editing, and I could not read CI failures or the round brief from Lore. There was no `round-brief.md` on disk, so this round had no CI verdict to act on.
- This repo runs Jest, not Vitest. I ran only my new file with `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`.
- I did not run the acceptance test, the existing `chatOrchestrator.test.ts`, lint, typecheck, or the build. I ran Prettier on the two changed source files; they were already formatted.
- Test tally: 1 red test written by me, turned green. Regressions: none known, but unverified. CI will confirm.
- Out of scope and untouched, as the ticket says: the `instanceof Error` gate on `onError`, and usage accounting across tool rounds (#93).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}