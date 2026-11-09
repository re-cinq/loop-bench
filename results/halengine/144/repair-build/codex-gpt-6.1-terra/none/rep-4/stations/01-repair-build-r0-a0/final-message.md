Implemented and pushed the session-list handler and fixes for the reported lint findings in commit `81c8c97`. The test’s empty-list expectation was changed because the ticket requires `UNSUPPORTED` when the store cannot list conversations.

The affected acceptance suite passed: `npm test -- --runInBand src/transport/conversationList.acceptance.test.ts` (3 tests). The branch is up to date with `origin/main` and its upstream. CI will judge the pushed commit; lint and typecheck were not run locally as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Session-list requests received no response, and test helpers triggered lint findings."}}