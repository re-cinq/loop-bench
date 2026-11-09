The acceptance tests conflict with the ticket’s security requirements. They require an empty list when the store has no `listFor`, while the ticket requires `UNSUPPORTED`; they also use different frame names and omit the required history opt-in. I stopped without editing the tests or implementation, as instructed for an incorrect acceptance test.

The CI brief is truncated, so it does not establish how many failing tests were newly written versus regressions. No tests were run, and no changes were committed or pushed.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict the ticket's required protocol and unsupported-store behavior."}}