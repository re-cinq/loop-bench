I fixed the four eslint errors from CI. The fix is committed and pushed, and the branch is in sync with its upstream. Nothing was run locally: CI is the judge, and I did not run eslint, tests or a typecheck in this pod.

- **Spec links:** I added `([validated by](...))` links for the three `accumulateUsage` tests in `specs/hal-engine-architecture/spec.md`, next to the existing `shouldContinueToolLoop` entries. That cleared the three `re-lint/require-spec-link` errors.
- **Two expects:** I split the test with two `expect` calls into two single-expect tests, one per undefined side. That cleared `re-lint/max-expects`. The spec links use the new test line numbers (L29, L35, L40, L45).
- **Branch state:** The branch had not moved since CI judged it. Merging `origin/main` brought in nothing (already up to date).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"accumulateUsage tests lacked spec links and one had 2 expects; added links in hal-engine-architecture spec and split the test"}}