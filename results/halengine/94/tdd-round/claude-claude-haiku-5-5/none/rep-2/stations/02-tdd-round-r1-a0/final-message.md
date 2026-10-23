Round delivered and pushed: `loop-bench/94` is at `728736f`, not ahead of its upstream, and it already contained `origin/main`, so nothing needed merging.

**No tests ran in this pod, and no new test was written this round.** The acceptance test is CI's to run, and the behaviour was already green on the last push: the CI verdict lists typecheck, eslint and changelog as red, not the test step. So the red phase had nothing new to add. The open facets were the spec and the CHANGELOG, and the CI findings.

**CI findings, all in the round brief's verdict on `edc0a4b`:**
- **Typecheck (2):** both test files passed `baseSystemPrompt`, which `PromptBuilderConfig` doesn't have. The acceptance test now uses `identity`. The test's behaviour is unchanged; I only fixed the config.
- **Eslint, max-expects:** the acceptance test's three expects are now one. Identity is still checked: `[rejection === errorToThrow, caughtError === errorToThrow, afterSessionRan]` equals `[true, true, true]`.
- **Eslint, duplicate code and missing spec link:** I deleted `chatOrchestrator.beforeSessionOnError.test.ts`. It duplicated the acceptance test, and its one assertion is covered there. This was a judgment call over adding a spec link to a redundant test.
- **Changelog:** added a `### Changed` entry under `[Unreleased]`. It covers the new `onError` and `afterSession` behaviour, the `store.save` call that now happens for this turn, and a migration note for `afterSession` hooks.
- **Spec:** the `#L40` link on the acceptance test is now `#L32`, which I checked by reading the file. The intro sentence said this issue changed none of the three properties, which contradicts the first bullet, so I corrected it. The guarantee itself (`afterSession` runs, and a hook can assume no tool ran and no provider call was made) was already in the spec.
- **dod.md:** ticked the spec and CHANGELOG facets. I left the "Done when" box for CI to confirm.

**Regressions:** none. Every finding was in a test file this ticket added, so the red tests were mine (two files), and no pre-existing test was red.

**Not checked here:** I ran no typecheck, lint, format check or test, and didn't run `check-spec-links`. The lore tools (`lore_get_ci_failures`, `lore-query-trace`) aren't available in this session, so I read the test files directly to check coverage.

**Unrelated smell, not touched:** the spec keeps the heading "Measured semantics — out of scope" over a bullet that is now in scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI lint/typecheck/changelog findings fixed; spec and CHANGELOG facets closed","tdd_next":"acceptance green"}}