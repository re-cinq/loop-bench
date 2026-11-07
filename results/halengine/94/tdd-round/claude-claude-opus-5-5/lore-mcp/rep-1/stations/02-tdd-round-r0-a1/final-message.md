This round updated the spec. It changed no code and ran no tests. The code fix was already in place from the last round, and this facet is only spec text. A test that checks the spec's wording is not allowed, so there was no failing test to write.

**What changed** (in `specs/hal-engine-config-hooks/spec.md`):
- **New section, "A failing `beforeSession`":**
  - When `beforeSession` throws, the caller still gets the same rejection, `onError` receives the thrown error, and `afterSession` still runs. The turn stops before any provider call or tool runs. This keeps the links to the acceptance test and the unit test from the last round.
  - It answers the question the ticket left open: `afterSession` runs after a failed `beforeSession`, but it receives only the session. It cannot tell a failed start from a finished turn, so a deployer's cleanup in `afterSession` has to cope with something that was never allocated.
- **"Measured semantics — out of scope":** the `beforeSession` line is gone, and the intro now says "these two properties … this spec changes neither".
- **`.lore/dod.md`:** I ticked the two spec facets.

The commit is pushed. Merging `origin/main` brought in nothing new, and `git status` shows the branch level with its upstream.

**Red tests:** there is no round brief and no CI verdict to read, so the count is 0 of mine and 0 regressions.

**Smells I noticed and left alone:** the spec's links to `chatOrchestrator.ts#L148` and `#L150` point at line numbers rather than tests, so they go stale whenever that file shifts. Pointing them at tests that cover those behaviours would fix that.

**Next round:** the CHANGELOG entry saying what changes for an existing consumer: `onError` and `afterSession` now fire when `beforeSession` throws.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec states the failing-beforeSession guarantee and that afterSession cannot tell a failed beforeSession from a finished turn","tdd_next":"Document in the CHANGELOG what changes for an existing consumer"}}