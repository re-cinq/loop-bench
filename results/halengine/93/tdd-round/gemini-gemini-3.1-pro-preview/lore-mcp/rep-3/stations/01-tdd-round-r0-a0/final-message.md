I have completed the single TDD round by:
1. Writing a failing test for summing provider-call usage and another for properly preserving `undefined` usage when no rounds report it.
2. Modifying the orchestrator to aggregate `inputTokens`, `outputTokens`, and `totalTokens` when they are present across the tool loop.
3. Defining the explicit `TurnUsage` contract to structurally mirror `UsageMetadata` while clarifying its aggregation intent.
4. Preserving the existing unchanged no-tool regression guard.
5. Updating the hooks spec documentation and `CHANGELOG.md` to document the new accumulation behaviour and its impact.
6. Formatting the changed files, committing, and pushing the branch cleanly to `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"acceptance green"}}