I made no changes this round. The only open CI finding is in an acceptance test, and I'm not allowed to edit those.

CI's single remaining failure is eslint's `re-lint/prefer-early-return` at `src/transport/conversationList.acceptance.test.ts:67`. It is in the `if (frame.type === 'connected') {…}` block inside `askAfterConnect`, in the red acceptance file committed in `f291811`. No lint finding is left in any file I own. The last round already fixed `validation.ts` and `wsTestSupport.ts`.

Every facet in `.lore/dod.md` is ticked except the blocked one. I haven't verified the three acceptance tests pass. I never run them, and the brief says only that eslint failed. Nothing else in the brief is red.

Clearing it needs a human to choose one of these:
- Amend the acceptance file so the handler flattens its happy path.
- Add an eslint exemption for that file.
- Waive the rule for it.

Red tests this round: none were mine and none were regressions.

Unrelated smell I noticed and left alone: the same `connected`/`ping`/`pong` handshake loop sits inside the acceptance helper.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"only remaining CI finding is prefer-early-return at conversationList.acceptance.test.ts:67, inside an acceptance test I may not edit; needs a human decision (amend test or exempt the file from the rule)"}}