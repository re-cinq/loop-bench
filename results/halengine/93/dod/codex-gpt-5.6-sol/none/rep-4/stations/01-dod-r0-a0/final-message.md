Implemented and pushed the direct acceptance contract for #93.

- Added one focused acceptance test covering complete, partial, and absent usage reporting across two tool rounds.
- Updated the linked spec with traceability.
- Added `.lore/dod.md`.
- Commit: `9bd0657`
- Branch is synchronized with `origin/main` and its upstream.

Red-bar output:

```text
Expected everyRound: {inputTokens: 51, outputTokens: 10, totalTokens: 61}
Received everyRound: {inputTokens: 23, outputTokens: 5, totalTokens: 28}

Expected someRounds: {inputTokens: 34, outputTokens: 7, totalTokens: 41}
Received someRounds: {inputTokens: 23, outputTokens: 5, totalTokens: 28}

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}