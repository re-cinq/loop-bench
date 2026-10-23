Round delivered for facet 1 of 3. The branch is pushed and up to date with `origin/main`. I have not confirmed CI's verdict.

**What I did**
- **Red:** wrote `src/orchestration/chatOrchestrator.beforeSessionOnError.test.ts` with one test, "passes the beforeSession error to onError". It failed for the expected reason: `onError` was never called.
- **Green:** moved the `beforeSession` call inside the `try` in `chatOrchestrator.ts`. The new test passes.
- **Refactor:** none needed. The change is one line moved.
- **Facet ticked:** in `.lore/dod.md`, "Move `beforeSession` inside the `try` block" is now `[x]`. The "Done when" box is still unticked, since CI judges that.
- **Commit and push:** `edc0a4b` on `loop-bench/94`. The merge with `origin/main` was a no-op.

**Things you should know**
- **I ran an acceptance test by mistake.** My command included `chatOrchestrator.beforeSession.acceptance.test.ts`, which the brief says not to run this round. It passed locally. I did not run it again.
- **The Lore tools were not available.** `ToolSearch` found no `lore_*` tools, so I skipped `lore-query-trace` before editing and did not read CI's verdict. There was no `round-brief.md`, so I have no CI findings to fix.
- **Test counts:** no red tests from my own work. My new test was red before the change and green after. I have no CI verdict on regressions.
- **Facets 2 and 3 remain open:** the spec update and the CHANGELOG entry.
- **Spec line 26 already claims `beforeSession` is inside the `try`.** It also cites the acceptance test with `#L40`, which may not be accurate. Facet 2 should check that.
- **Smell, not fixed:** the `error instanceof Error` gate on `onError`. The ticket already lists it as out of scope.

**Next facet:** update `specs/hal-engine-config-hooks/spec.md` with the new guarantee, including what a hook can assume about how much of the turn ran.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}