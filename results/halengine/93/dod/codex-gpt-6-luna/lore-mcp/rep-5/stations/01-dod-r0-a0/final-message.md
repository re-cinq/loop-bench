Added one direct acceptance test using a scripted provider and real tool registry. Across two tool rounds, it expects usage summed from all three provider calls. The spec now links to the test, and `.lore/dod.md` records the ticket’s central claim and completion criterion.

The test failed for the reported behavior:

```text
Expected: {"inputTokens":60,"outputTokens":9,"totalTokens":69}
Received: {"inputTokens":30,"outputTokens":4,"totalTokens":34}
```

Committed and pushed as `c52da7b` and `525b1f7`. The branch is up to date with `origin/main`, and `git status` reports it is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}