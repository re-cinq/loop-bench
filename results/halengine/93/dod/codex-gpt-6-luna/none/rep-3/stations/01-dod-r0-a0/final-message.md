Added and pushed the `direct` acceptance test and DoD in commit `362d021`. The branch is up to date with `origin/main` and its upstream.

The test fails for the reported under-count:

```text
Expected: { inputTokens: 51, outputTokens: 15, totalTokens: 66 }
Received: { inputTokens: 23, outputTokens: 7, totalTokens: 30 }
```

`prettier` formatted the changed files. I ran only the acceptance test; I did not run the full suite, lint, or typecheck.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}