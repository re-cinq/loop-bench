Branch is pushed and up to date. This round fixed all 5 eslint `re-lint/require-spec-link` failures and ticked the Type facet by adding a one-line JSDoc comment to `afterModelResponse` in `OrchestratorHooks`.

0 red tests were mine, 0 were regressions — this round only added spec links and a documentation comment, no logic changes.

Unrelated smells noticed but left alone: the `## Measured semantics — out of scope` section header in the spec still says "out of scope" even though that behaviour has now been changed; the preamble of that section still reads "This issue changes none of them", which is now inaccurate. Neither is a CI-failing issue.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Type: document that afterModelResponse usage is a sum; fix all 5 spec-link eslint errors","tdd_next":"acceptance green"}}