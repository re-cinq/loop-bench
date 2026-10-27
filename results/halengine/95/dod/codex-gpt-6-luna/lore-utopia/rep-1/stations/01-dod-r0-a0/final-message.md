Added and pushed the `direct` acceptance test, DoD, and linked spec guarantee. Commit: `aa484d5`. The branch is up to date with its upstream, and `origin/main` was already merged.

The acceptance test failed for the ticket’s stated reason:

```text
Expected length: 1
Received length: 0
Received array:  []
```

The caller rejection was preserved, but `onError` received nothing. The other rejection cases are checked in the same test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}