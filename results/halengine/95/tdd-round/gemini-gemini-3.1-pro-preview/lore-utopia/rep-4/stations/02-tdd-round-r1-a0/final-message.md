I fixed the CI findings as requested:
1. Replaced the non-deterministic `new Date().toISOString()` with a fixed timestamp in `src/orchestration/onErrorNonError.acceptance.test.ts` to satisfy the `re-lint/no-nondeterministic-tests` rule.
2. Repointed the drifted spec anchor links in `specs/hal-engine-architecture/spec.md`, `specs/hal-engine-config-hooks/spec.md`, and `specs/hal-engine-tool-input-validation/spec.md` to align with the new line numbers in `chatOrchestrator.test.ts` and `onErrorNonError.acceptance.test.ts` to satisfy `spec-names` and `re-lint/require-spec-link`.
3. Added the missing `CHANGELOG.md` entry under `## [Unreleased] > ### Changed` to explain the new behavior of `onError` coercing non-Errors for consumers.

I then ticked the final facet in `.lore/dod.md`. All facets are now ticked, and the acceptance tests will be executed by CI. No tests were executed in this pod, as it was limited to fixing the CI findings from the previous push.

I committed and pushed these changes to origin, and confirmed there were no merge conflicts with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a CHANGELOG.md entry under ## [Unreleased] describing the behaviour change for existing consumers","tdd_next":"acceptance green"}}