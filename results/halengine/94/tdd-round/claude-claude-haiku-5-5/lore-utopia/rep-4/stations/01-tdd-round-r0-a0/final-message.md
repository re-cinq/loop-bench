Round done for facet 1 (move `beforeSession` inside the `try`). Commit `f875835` is pushed to `origin/loop-bench/94`, `origin/main` is already an ancestor, and the branch is not ahead of its upstream.

**What changed**
- `src/orchestration/chatOrchestrator.ts`: the `beforeSession` call now sits inside the `try`, so a throw reaches `onError` and `afterSession`. Nothing else moved.
- `src/orchestration/chatOrchestrator.beforeSessionOnError.test.ts` (new): one test that a `beforeSession` throw reaches `onError` as the same `Error` and rejects the caller. I ran it red first (`onError` received `undefined`), then green after the move.
- `.lore/dod.md`: facet 1 ticked. Facets 2 (spec) and 3 (CHANGELOG) are still open.

**Tests run in this pod:** only my new file, with the repo's ESM flag (`node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`). It went red, then green. I did not run the acceptance test, the existing orchestrator suites, lint, typecheck, or build. Formatting was done with prettier on the two changed files.

**Gaps and notes**
- Both lore gateway calls failed with HTTP 403: `lore-query-trace` (no read scope) and `lore_get_ci_failures`. So I could not check which tests cover `chatOrchestrator.ts` or read any CI verdict. There is no `round-brief.md`, so this is treated as a first round. I did not look for or try other credentials.
- `specs/hal-engine-config-hooks/spec.md` line 26 already states that `beforeSession` is inside the `try` and cites the acceptance test. That text came with the RED commit, not this round. Facet 2 still needs checking that the recorded-flaw line is replaced and that the "what a hook can assume" statement is explicit.
- The ticket's `npm` commands use Jest, but `.lore/test-commands.yml` names Jest as the suite, so no mismatch there.
- Unrelated smells: none noticed in the files I read.

Red tests this round: 0 from CI, since no CI verdict was readable. My own new test went red then green locally. Regressions: none known.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}