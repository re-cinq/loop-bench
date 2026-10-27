Added the wrong-type privacy test, repaired the reported registry-test type and lint issues, and updated the spec links and DoD. The registry test file passed (4 tests). Commit `ea96f55` is pushed, and the branch is even with its upstream.

The previous CI brief reported a test-step failure but its details were truncated; Lore could not retrieve the CI report for this branch, so I can’t classify those test failures. No test failures occurred in this round. Next: schema caching and tool-loop retry behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject invalid property types with field and expected type details, without exposing the rejected value in the response or logs","tdd_next":"Schema compilation timing/caching and tool-loop retry behavior"}}