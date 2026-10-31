Added and pushed red acceptance tests in commit `a84e316`.

Failure evidence:

> Expected `{inputTokens: 21, outputTokens: 15, totalTokens: 36}`; received final-round `{inputTokens: 3, outputTokens: 8, totalTokens: 11}`.

> Expected partial total `{10,3,13}`; received final reported round `{6,2,8}`.

Also added `.lore/dod.md` and linked the updated spec statement to the acceptance test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}