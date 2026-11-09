Blocked: the acceptance tests require history without opt-in and an empty list when `listFor` is missing. Ticket #144 explicitly requires default-off history and `UNSUPPORTED` in both cases. The frame names also differ.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. New red tests: 0; regressions observed: 0. CI status was unavailable: Lore returned “branch not found.”

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict ticket #144 on opt-in, unsupported stores, and protocol frame names; the intended contract must be reconciled."}}