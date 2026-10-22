I have completed the tasks assigned from the CI failures. 

I fixed the `spec-names` and `eslint` errors by running the repository's provided `npm run spec:names:fix` and `node scripts/repoint-spec-anchors.mjs` commands, which updated the `specs/**/*.md` files. The fixes were formatted, committed, and pushed cleanly to the remote branch. 

However, I cannot write a test for the next facet or get the bar to green because of the CI `test` failure: the acceptance test is wrong.

The acceptance test in `src/transport/conversationList.acceptance.test.ts` (specifically the second `it` block) expects an empty `session_list` when the store has no `listFor`. It asserts:
`unimplemented: [{type: 'session_list', sessions: []}]`

However, this violates the ticket's instruction and its amendments: 
> "A store that implements no `listFor` is answered with an `error`, not an empty list: a client that renders "no conversations" for a user who has several is a worse answer than one that renders a failure. ErrorCodes gains one code for both cases (`UNSUPPORTED`)"
> "With history: {enabled: true} against a store implementing no listFor, the answer is the same error frame, and grep shows no code path that sends conversations: []"

Because I am not allowed to edit the acceptance test to make it pass, I am blocked.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test src/transport/conversationList.acceptance.test.ts is wrong: it expects an empty session_list when listFor is missing, but the ticket specifies returning an UNSUPPORTED error."}}