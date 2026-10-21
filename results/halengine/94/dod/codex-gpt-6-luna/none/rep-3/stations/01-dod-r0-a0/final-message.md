Added and pushed the direct acceptance test in commit `2c469ae`. The test reaches the real `createChatOrchestrator` entry point and confirms the original rejection is preserved, `onError` and `afterSession` receive the expected arguments, and later turn hooks do not run. The spec records that `afterSession` may run after partial setup; the DoD lists the consumer-facing changelog note for the implementation round.

The named acceptance test failed for the ticket’s stated reason:

> Expected `onError` and `afterSession` calls; received only `beforeSession`.

The spec link targets the test title at line 24. `origin/main` was already up to date, and the branch is clean and not ahead of its upstream. I ran only the acceptance test; it remains red by design.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}