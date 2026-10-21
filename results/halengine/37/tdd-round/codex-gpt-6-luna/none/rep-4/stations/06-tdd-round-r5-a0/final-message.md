Added a focused registry test for wrong-type rejection, field/type reporting, value redaction, and preventing executor calls. Updated the spec links and DoD checklist. The test passed; the branch is committed, pushed, merged with `origin/main`, and up to date.

The prior CI failure is in provider code unchanged from `origin/main`, so I counted **0 regressions** from this round. The focused test passed, so there are **0 tests of mine red** in the final run. I couldn’t run `lore-query-trace`; it isn’t available in this environment.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Registry unit coverage for wrong-type rejection without echoing the value","tdd_next":"Remaining registry and orchestrator tests, documentation and changelog updates"}}