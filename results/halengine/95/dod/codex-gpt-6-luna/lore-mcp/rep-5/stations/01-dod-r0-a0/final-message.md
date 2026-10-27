Added and pushed the `direct` acceptance test in commit `5e11e54`. The spec statement links to the test, and `.lore/dod.md` records the remaining facets. `main` was already up to date; the branch matches its upstream.

Ran only the new acceptance test file. All three cases failed at the missing hook call:

```text
Expected length: 1
Received length: 0
Received array:  []
```

The string, plain-object, and `undefined` rejection cases all failed this way.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}