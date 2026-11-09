Blocked: the acceptance tests require an empty list when `listFor` is missing, directly contradicting the ticket’s required `UNSUPPORTED` error. They also use different frame names and omit history opt-in. Your instructions require stopping when acceptance tests are wrong.

The required `tdd-loop` skill and Lore trace tools are also unavailable. No files changed, no tests run, no commits pushed. New red tests: 0; regressions observed: 0 (unverified).

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict the ticket on unsupported stores, frame names, and history opt-in; resolve the contract before implementation."}}