Committed and pushed one round (`5a5f32f`). A new test failed on an unstringifiable rejection, then passed after `onError` gained a fallback message while preserving the original rejection. I also fixed the nondeterministic date flagged by CI without changing the acceptance assertions.

The focused test passed after refactoring. The previous CI verdict reported **0 red tests I wrote and 0 regressions**; the new push awaits CI. The branch is up to date with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the original rejection and call onError when the value cannot be converted to a string","tdd_next":"acceptance green"}}