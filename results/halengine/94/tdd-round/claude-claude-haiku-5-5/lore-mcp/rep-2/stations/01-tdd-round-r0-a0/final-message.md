The facet is closed and pushed: `beforeSession` now runs inside the `try`, so a throw reaches `onError` and `afterSession` as the ticket asks. The branch is pushed and not behind `origin/main`.

**Round (one facet):**
- **Red:** I added "saves and still rethrows when beforeSession throws" to `src/orchestration/sessionSave.test.ts`. It failed because nothing was saved (`saved: []`). That is the observable effect of skipping `finally`.
- **Green:** I moved the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`. The file's line count is unchanged, so the spec's `chatOrchestrator.ts#L150` link still points at the `onError` gate.
- **Refactor:** Nothing to refactor. Prettier reported both files unchanged.
- **Ticked:** the first facet in `.lore/dod.md`.

**Tests run here:** only `sessionSave.test.ts` (7/7 green after the change). The acceptance test, the existing `chatOrchestrator.test.ts`, and the rest of the suite were not run here, per the rules. CI will judge them. I did not run lint, typecheck, or build.

**Regressions:** none known. No `round-brief.md` exists, so there was no CI verdict to work from.

**Not done:**
- The `lore` MCP server failed to connect (`CONNECTION_CLOSED`), so I made no `lore_*` calls and ran no `lore-query-trace`. I checked coverage by grep instead: `sessionSave.test.ts` is the existing file that exercises the save path.
- The spec (`specs/hal-engine-config-hooks/spec.md`) still has the measured-flaw line that I did not touch. The spec's `afterSession` guarantee, and whether a hook can tell "never started" from "finished", is facet 2.
- The CHANGELOG entry for existing consumers is facet 3.
- I did not add a spec anchor to the new test, because the statement it validates is rewritten in facet 2.

**Smells noticed, not fixed:** the spec's "measured semantics" line 26 currently describes `beforeSession` as inside the `try`, which was not true until this round. The `instanceof Error` gate on `onError` is out of scope, per the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}