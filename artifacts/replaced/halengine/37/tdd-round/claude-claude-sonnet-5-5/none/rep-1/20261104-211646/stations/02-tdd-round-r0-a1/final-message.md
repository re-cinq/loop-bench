I closed one facet this round: a unit test showing that a function-valued tool definition is validated against the schema returned for the current call. The full last facet, the remaining tests and docs, is still open.

The test is in `src/orchestration/tools/registry.test.ts`. It changes the returned schema between two `execute` calls. The first call is rejected for missing `location`; the second passes and runs the executor once. It was already green against the existing code, so there was no red phase. No code change was needed, and there was no refactor.

I ran only that test file, with the `--experimental-vm-modules` flag from `package.json`'s `test` script. Both tests in it pass. I did not run the acceptance tests, so I can't say where they stand.

I linked the matching statement in `specs/hal-engine-tool-input-validation/spec.md` to the test. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I set the `#L31` anchor by hand. I updated the last facet in `.lore/dod.md` to list what is done and what remains. It stays unticked.

The commit is pushed. Merging `origin/main` changed nothing, and the branch is not ahead of its upstream. There were no CI findings to fix, so no red tests were mine and none were regressions.

**Next round:**
- the compile-once-across-ten-calls test
- the `Unknown tool: <name>` throw test
- the log-redaction test
- the `chatOrchestrator.test.ts` rejected-then-corrected retry test
- the doc and `CHANGELOG.md` updates
- the spec `Status` row update

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"function-valued schema validated per call (registry.test.ts) with spec link","tdd_next":"remaining unit tests (compile-once, Unknown tool throw, log redaction, orchestrator retry) then docs/example/CHANGELOG"}}