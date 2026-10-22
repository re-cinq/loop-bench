I have resolved the `eslint` and `changelog` findings reported by CI, formatted the changed files, and pushed the branch to origin. 

However, I cannot proceed with the implementation because I am blocked by a contradiction between the ticket requirements and the acceptance tests. The ticket explicitly states: *"A store that implements no `listFor` is answered with an `error`, not an empty list... `ErrorCodes` gains one code for both cases (`UNSUPPORTED`)"*. Yet, the acceptance test in `.lore/dod.md` and `src/transport/conversationList.acceptance.test.ts` asserts exactly the opposite: it verifies that a store without `listFor` answers with `{type: 'session_list', sessions: []}`. 

Since I am forbidden from editing the acceptance tests to make them pass, and implementing the code to pass this test would violate the ticket, I am stuck.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test asserts an empty session_list when listFor is absent, but the ticket requires an UNSUPPORTED error."}}