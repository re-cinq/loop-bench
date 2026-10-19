Added the acceptance test and DoD, updated the usage statement in the spec, and committed and pushed `50bec41`. The branch is up to date with its upstream; `git status` is clean.

The named acceptance test fails for the reported under-counting:

```text
Expected: inputTokens 40, outputTokens 10, totalTokens 50
Received: inputTokens 30, outputTokens 8, totalTokens 38
```

`node scripts/repoint-spec-anchors.mjs` could not re-anchor the new citation because the spec’s anchor set differs from `origin/main`; I verified the citation points to the test declaration at line 40.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}