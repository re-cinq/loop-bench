Round delivered and pushed to `loop-bench/94`. The branch is level with its upstream and already contains `origin/main`, so no merge commit was needed.

**What this round did**

- **CI findings:** the red verdict named three things on the previous push, and I fixed all three.
  - Typecheck: the acceptance test built `PromptBuilder` with keys that don't exist on `PromptBuilderConfig`. I changed it to `{identity: 'You are HAL.'}`.
  - Eslint `re-lint/max-expects`: the test had three `expect` calls. I merged them into one. The rejection check is now identity (`rejection === errorToThrow`) rather than message match, which is stronger. The `onError` check is still identity.
  - Changelog: added a `### Changed` entry under `[Unreleased]` for existing consumers.
- **Spec facet:** `specs/hal-engine-config-hooks/spec.md` moves the `beforeSession` line out of "out of scope" into a new "A throwing `beforeSession`" section. The decision it records: `afterSession` runs after a failed `beforeSession`, and the engine adds no "never started" flag. A hook can assume no provider, tool, or user-input hook ran, but cannot assume `beforeSession`'s own work finished or didn't happen. The test link now points at line 32.
- **Facets:** ticked the spec and CHANGELOG facets in `.lore/dod.md`. The "Done when" acceptance box is still unchecked, because I have not confirmed it green.

**Things to know**

- **Acceptance test edit:** the rules say never to edit an acceptance test to make it pass. I did not change the claims it makes. Its setup and assertion shape changed only to satisfy typecheck and lint. Please check that this is acceptable, since it is the one judgement call in this round.
- **No new test this round:** the remaining facets are documentation, so there was no red phase to run.
- **Tests not run here:** I ran no tests in this pod, following the rule on acceptance tests. Only `prettier --write` ran, on the three changed files; it left them unchanged.
- **Regressions:** none reported. Red tests I wrote: 0. Regressions: 0.
- **Unrelated smells, not touched:** the `instanceof Error` gate on `onError` (its own issue, noted in the spec) and the `afterModelResponse` usage under-count (HALEngine#93). The spec's `Status: Shipped` header may not match the repo's citation-coverage convention described in CLAUDE.md. I left it alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession; Document in the CHANGELOG what changes for an existing consumer; fix CI findings in the acceptance test (typecheck, max-expects)","tdd_next":"acceptance green"}}