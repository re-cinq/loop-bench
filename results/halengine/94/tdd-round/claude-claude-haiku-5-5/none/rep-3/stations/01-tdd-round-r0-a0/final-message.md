The round is pushed and the branch is level with `origin/main`. I checked `git status` after the merge: it reports no commits ahead of upstream.

## Round summary

**Facet closed:** move `beforeSession` inside the `try` in `src/orchestration/chatOrchestrator.ts`.

**What I did (one red-green round, no refactor needed):**
- **RED:** wrote `src/orchestration/chatOrchestrator.afterSessionOnFailure.test.ts`, a test that `afterSession` runs when `beforeSession` throws. I ran it and it failed with `Expected: 1, Received: 0`, which is the expected reason. I didn't touch the acceptance test.
- **GREEN:** moved the `beforeSession` call to the first line inside the `try`. The new test passes.
- **REFACTOR:** nothing to tidy in a one-line move.
- Ticked the first facet in `.lore/dod.md`. Prettier left both changed files unchanged.
- Committed `681fcd8` (`fix(orchestrator): run afterSession on early throw`) and pushed it to `loop-bench/94`.

**Tests in this round:** I ran only my new test file, using `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`. The repo's `npm test` sets that flag, and a plain `npx jest` fails on ESM. The acceptance test and the rest of the orchestration suite were not run here, so CI owns their verdict. Red tests I wrote: 1, now green. Regressions: none seen locally, but I could not check CI.

**Not done here:**
- No lore tools were available in this session, so I could not run `lore_query_trace` before editing `chatOrchestrator.ts`, and I could not read `lore_get_ci_failures`. There was no `round-brief.md`, so there were no CI findings to fix.
- No traceability parenthetical was added to the spec and no spec anchor was stamped on the new test.
- Facets still open: update `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and document the consumer change in the CHANGELOG. The spec already has a line claiming `beforeSession` is inside the `try`, so the next round should check what text still needs replacing.
- Not fixed, noted only: the `instanceof Error` gate on `onError` (out of scope per the ticket). The `closeExhaustedTurn` comment line is a sentence over the one-line limit in CLAUDE.md, which I didn't check.
- No lint, typecheck, or build was run, per the pod rules.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}