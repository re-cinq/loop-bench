I'm stopping this round without changing anything. The only thing failing CI is a lint error inside the acceptance test, and fixing it means editing that test, which this round isn't allowed to do.

**The failure.** CI on `9a0b6e8` is red on eslint only: `src/transport/conversationList.acceptance.test.ts:67:7`, rule `re-lint/prefer-early-return`. It flags the `if (frame.type === 'connected') { … return; }` block in the `askAfterConnect` helper. That code is in the acceptance test file itself, not in anything a round wrote.

**Why I didn't work around it:**
- Rewriting line 67 or adding an `eslint-disable` comment both edit an acceptance test.
- Exempting `*.acceptance.test.ts` from the rule in `eslint.config.mjs` would weaken CI's lint to let one file through. The config has no such exemption for any test today, so that is a policy call for the owner.
- `.lore/dod.md` already records this finding as needing the owner, and the previous round reported the same. Doing another facet while it stands would push another build that is red for the same reason.

**For the ticket owner:** the acceptance tests in `.lore/dod.md` don't match the ticket. They test `list_sessions` / `session_list` with an empty list when the store has no `listFor`. The ticket asks for `list_conversations` / `conversation_list`, an opt-in `transport.history` flag, and an `UNSUPPORTED` error rather than an empty list. Even with the lint fixed, a branch that passes these tests won't meet the ticket.

**State:** nothing was committed. No tests ran this round. The branch is level with `origin/loop-bench/144`. Red tests: 0 mine, 0 regressions; the one CI finding is a lint error in the acceptance test.

**Still open after the owner decides:** the §5 `session_list` field table in `specs/hal-engine-websocket-protocol/spec.md` and the conversation-list spec.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI's only failure is re-lint/prefer-early-return at conversationList.acceptance.test.ts:67, inside the acceptance test; fixing it means editing that test or exempting it from lint, which needs the owner's decision"}}