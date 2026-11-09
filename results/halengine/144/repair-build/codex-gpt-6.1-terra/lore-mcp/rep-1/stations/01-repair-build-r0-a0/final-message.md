Pushed commit `f4c7c35` and confirmed the branch is up to date with its upstream.

The conversation-list acceptance and validation suites pass locally. The acceptance test’s expectation of an empty list for a store without `listFor` was wrong: the ticket requires an `UNSUPPORTED` error, so I corrected it.

A broader targeted run still failed: `sessionResume.test.ts` received a 404 during a reconnect test. The scoped coverage run also could not meet repository-wide coverage thresholds. I did not run lint or typecheck, as instructed.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Targeted tests passed for conversation listing and validation; sessionResume.test.ts still failed with a 404."}}