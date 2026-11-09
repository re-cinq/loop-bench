Committed and pushed `fa063c4`. Validation errors now name the failed constraint, and the required-input test uses one assertion. The new enum test failed before the change and passed afterward; formatting completed.

The prior CI brief also showed a failure in `providerFactory.test.ts`, but its truncated output did not include the failure message. I could not determine whether it was a regression or fix its cause from that verdict. The local round had **1 red test of mine and 0 confirmed regressions**. CI must verify the AJV import and the remaining failures.

The branch is up to date with `origin/main` and its upstream. The next facet is caching validators for function-valued schemas.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"identify validation constraints without exposing input values","tdd_next":"cache dynamic schema validators by object reference"}}