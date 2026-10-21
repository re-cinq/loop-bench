Committed and pushed `fb13e52`. I consolidated the usage test’s three assertions into one, addressing the CI lint finding; that test file passes locally. The existing no-tool test remains unchanged, and the branch is fully pushed and up to date with `main`.

Previous CI findings: 1 in our test, 0 regressions. The hooks spec and changelog facet is next.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the unchanged no-tool regression guard","tdd_next":"Update the hooks spec and CHANGELOG with aggregate-usage behavior and its impact on existing consumers"}}