Repaired the CI lint finding by combining three assertions into one. The single edited test file passes locally. The existing no-tool guard remains unedited, and I marked its facet complete. The commit is pushed and the branch is current with `main`.

CI reported zero red tests from this work and zero regressions; its failure was lint. The next facet is the hooks spec and changelog.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the unchanged no-tool regression guard","tdd_next":"Update the hooks spec and CHANGELOG with aggregate-usage behavior and its impact on existing consumers"}}