Added and pushed red acceptance tests in commit `11cff73`.

Both tests fail for the reported under-counting:

- Expected `{inputTokens: 22, outputTokens: 31, totalTokens: 53}`, received final-round `{13,17,30}`.
- Expected partial-round sum `{9,14,23}`, received final reported `{7,11,18}`.

Updated the hooks spec citations and added `.lore/dod.md`. Branch is pushed and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}