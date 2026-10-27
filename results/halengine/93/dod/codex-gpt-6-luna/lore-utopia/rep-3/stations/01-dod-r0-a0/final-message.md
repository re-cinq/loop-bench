Added and pushed the direct-strategy DoD and two acceptance tests. Both fail at the hook’s usage argument:

> Expected `inputTokens: 21, outputTokens: 7, totalTokens: 28`; received `inputTokens: 11, outputTokens: 4, totalTokens: 15`.

> Expected `inputTokens: 6, outputTokens: 3, totalTokens: 9`; received `inputTokens: 2, outputTokens: 1, totalTokens: 3`.

The no-tool test in the existing suite remains untouched. The branch is up to date with `origin/main`, pushed, and clean against its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}