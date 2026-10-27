Added and pushed the acceptance test and updated the spec’s recorded behavior. The branch is up to date with its upstream.

The named test fails for the ticket’s stated reason: the caller receives the original rejection, but neither lifecycle hook runs.

> `Object { "calls": Array ["beforeSession"], "receivedError": undefined, "receivedSession": undefined }`

Commit: `fbf5f52` (`Add acceptance test for beforeSession failures`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}