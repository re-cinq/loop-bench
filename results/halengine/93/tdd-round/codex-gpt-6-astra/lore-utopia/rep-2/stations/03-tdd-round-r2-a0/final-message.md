Pushed `a21ff47`: fixed CI’s assertion-count violation while preserving both cases. The edited test passes; spec anchor remains valid. Branch is current with main and has no unpushed commits.

CI reported one lint finding, zero red tests, and zero regressions. This visit delivered the CI repair, not a new red-green facet. Public usage typing remains next.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair missing-usage test max-expects violation","tdd_next":"Make the public total-usage contract explicit and record the API decision and MINOR bump"}}