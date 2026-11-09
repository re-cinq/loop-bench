The acceptance test conflicts with the ticket’s required behavior: it expects history to be available without an opt-in and expects an empty list when the store cannot list conversations. The ticket explicitly requires history to default off and both cases to return `UNSUPPORTED`. It also tests different frame names.

The instruction for an incorrect acceptance test is to stop, so I made no changes and ran no tests. I cannot establish the number of CI failures or regressions from a round brief because none was present.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test contradicts the ticket's opt-in and unsupported-store requirements and uses different frame names."}}