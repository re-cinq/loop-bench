Committed and pushed `493d044`; branch is current with main and upstream.

Static input validation passes the new test after one red-green round. Fixed CI’s import and lint findings. CI reported two existing regression suites; this round added one red test, now green. Acceptance tests remain CI’s responsibility.

Next: dynamic schema validation and caching. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject missing required input for static tools before execution; repair CI import and lint findings","tdd_next":"Resolve dynamic tool schemas per call and cache validators by schema object"}}