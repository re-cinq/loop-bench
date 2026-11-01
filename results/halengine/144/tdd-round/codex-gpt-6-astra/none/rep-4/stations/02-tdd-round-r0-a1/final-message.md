Stopped under your rule for incorrect acceptance tests: they require an empty `session_list` when `listFor` is missing, while #144 explicitly requires an `UNSUPPORTED` error. They also use different frame names.

No files changed, tests run, commits, or pushes. New red tests: 0; regressions: unverified without CI results.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests require an empty list for missing listFor, contradicting ticket #144's required UNSUPPORTED error; the acceptance contract must be reconciled."}}