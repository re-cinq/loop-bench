Committed and pushed `9d9214a`. This round documented the `list_sessions` and `session_list` frames, fixed every typecheck and lint finding named in the CI brief, and added a cursor date-range test. That test went red, then green; no acceptance tests were run locally. Red tests: **1 mine, 0 regressions**.

The live DoD and ticket text disagree on the wire names and missing-store response. This round followed the DoD; CI will judge the pushed branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in both protocol specs","tdd_next":"acceptance green"}}