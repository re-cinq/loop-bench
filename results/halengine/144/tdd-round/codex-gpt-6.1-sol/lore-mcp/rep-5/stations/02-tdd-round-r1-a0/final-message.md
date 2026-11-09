The acceptance tests conflict with ticket #144: they require an empty `session_list` when `listFor` is missing, while the ticket requires an `UNSUPPORTED` error. They also use different frame names and omit the history opt-in.

Your instructions require stopping when acceptance tests are wrong. No files changed, tests run, commits made, or pushes made. CI’s truncated brief does not establish counts of failing tests versus regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require empty lists for missing listFor, contradicting the ticket's required UNSUPPORTED error; acceptance contract needs correction."}}