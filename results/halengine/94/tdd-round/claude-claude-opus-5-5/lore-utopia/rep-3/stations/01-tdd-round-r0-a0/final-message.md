I moved `beforeSession` inside the `try` in `src/orchestration/chatOrchestrator.ts`. A throw from it now reaches the caller as a rejection, as before, and also fires `onError` and then `afterSession`. The commit is pushed, the branch is level with `origin/main`, and nothing is left unpushed.

**Red-green-refactor**
- **Red:** I added one test to `src/orchestration/chatOrchestrator.test.ts:117`: "a throwing beforeSession fires onError then afterSession and never reaches the provider". It failed for the expected reason: no hooks were called after the throw.
- **Green:** I moved the one `beforeSession` line into the `try`. That test file, all 24 tests, passes, so a non-throwing `beforeSession` behaves exactly as before. Per the brief, I did not run the acceptance test; CI judges it.
- **Refactor:** none was needed.

**Traceability**
- I added a link to the new test on the `beforeSession` statement in `specs/hal-engine-config-hooks/spec.md` and stamped the test with `spec: specs/hal-engine-config-hooks/spec.md#7`. The repo has no stamping convention, so that comment form is my own.
- Adding the test moved the line of every test below it in that file, and the repo has no `reanchor.mjs`. I re-anchored 23 `#Lnn` links by test title across three spec files. `scripts/check-spec-links.mjs` reports 0 misplaced.

**Red tests:** 1 was mine, now green. There were 0 regressions, though CI has not judged this push yet.

**`.lore/dod.md`:** I ticked the first facet and added one more. The spec's "Measured semantics — out of scope" section still says "these three properties" and "this issue changes none of them", while its `beforeSession` line now describes the fixed behaviour. That section needs rewriting along with the spec facet.

**Things I noticed but didn't fix:**
- `AGENTS.md:138` has a link to "commits every entry before the next user message" at `chatOrchestrator.test.ts#L42`, and no test has that title. It looks like an illustrative example, so I left it.
- Running prettier on `specs/hal-engine-architecture/spec.md` inserts blank lines, meaning the file isn't prettier-formatted. CI only checks `.ts` files, so I reverted that churn.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee (move it out of the out-of-scope section, state what afterSession can assume)"}}