Added and pushed red acceptance tests in commit `b6c6586`.

Ran only the named acceptance cases plus the existing no-tool regression:

```text
Expected inputTokens: 37, outputTokens: 10, totalTokens: 47
Received inputTokens: 7, outputTokens: 3, totalTokens: 10
```

The missing-usage case likewise expected `18/5/23` but received only final-round `5/1/6`. The existing no-tool hook test passed.

Also added traceability links and `.lore/dod.md`. Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}