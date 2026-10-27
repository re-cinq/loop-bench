Added and pushed four acceptance tests covering authenticated listing, paging and resume, validation, opt-in refusal, and responding during a streaming turn. The protocol spec now cites the tests, and the DoD records the `direct` strategy. No production code was changed.

The named test run failed all four tests for the missing protocol behavior. For example:

> Expected `"conversation_list"`, received `"error"`  
> Expected `valid: true`, received `valid: false`  
> Expected `code: "UNSUPPORTED"`, received `code: "INVALID_MESSAGE"`

Commits `e898676` and `977fcc8` are pushed. `origin/main` was already merged, and the branch is clean and synced with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}