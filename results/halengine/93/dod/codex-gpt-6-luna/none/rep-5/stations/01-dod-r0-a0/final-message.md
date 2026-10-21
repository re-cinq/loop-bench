Added the direct acceptance test, linked it from the spec, and recorded the DoD. The test exercises two tool rounds and expects usage summed across all three provider calls.

It failed for the ticket’s stated reason: expected `{inputTokens: 60, outputTokens: 9, totalTokens: 69}`, received `{inputTokens: 30, outputTokens: 4, totalTokens: 34}`. No production code was changed.

Committed and pushed as `a85aa6f`. `origin/main` was already merged, and the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}