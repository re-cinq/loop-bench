Committed and pushed `80b75ef`. The prior CI verdict reported two layer import errors in the usage-type test; I corrected both. That test passes locally, and the existing no-tool guard remains unedited. The branch is current with `main` and its upstream; CI will judge the push.

The prior verdict reported **0 red tests of mine and 0 regressions**; its failure was lint. The Lore trace command was unavailable in this pod. No unrelated smells were changed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the unchanged no-tool regression guard","tdd_next":"acceptance green"}}