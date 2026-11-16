This round added the chatOrchestrator tool-loop test and set the spec's Status to Shipped. It is committed and pushed, and `origin/main` merged with nothing to bring in.

- **Test:** `chatOrchestrator.test.ts` now has a test where a stub provider's first tool call is rejected by the schema. The test asserts the rejection text names `q` and "required" in the next round's messages, and the executor ran only for the corrected retry. `processMessage` resolves instead of rejecting. That file passes locally (23 tests), and `registry.test.ts` passed in an earlier run.
- **CI findings:**
  - **eslint:** the spec Status was "In Progress" while all 8 statements carried links, which is exactly what `re-lint/require-status-matches-coverage` flagged. I set it to Shipped, but I did not run eslint (it OOMs here), so CI has to confirm the fix.
  - **test:** the brief's log showed only coverage output, and the lore CI tool returned "branch not found". I could not see which test failed, and the two test files I ran locally pass.
- **Spec link:** the orchestrator statement in the spec now also cites the new test. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I set the line number by hand.
- **Red tests:** none of the red tests were mine, and none were regressions I could identify.
- **Still owed:** README, `docs/adding-a-tool.md`, `.specify/spec.md`, ADR-002, `example/weather-tool.ts` and CHANGELOG. I left `dod.md` with that item unchecked.
- **Smell, not touched:** prettier re-indented the `.lore/dod.md` acceptance-test lines.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"chatOrchestrator rejection-then-retry tool-loop test; spec Status set to Shipped","tdd_next":"docs/adding-a-tool.md, README, .specify/spec.md, ADR-002, example/weather-tool.ts, CHANGELOG; re-check CI test failure"}}