I made no changes this round and pushed nothing. The branch is still at `9a0b6e8`, up to date with its upstream. I ran no tests.

**Why I stopped:** CI's verdict on the last push is red on one eslint finding, and it is inside the acceptance test itself:

```
src/transport/conversationList.acceptance.test.ts
  67:7  error  ... re-lint/prefer-early-return
```

The flagged code is the `if (frame.type === 'connected') {…}` branch in the `askAfterConnect` helper. Fixing it is only a reshuffle of control flow, but it means editing an acceptance test, which this round may not do. `eslint.config.mjs:110` applies the rule to every file, acceptance tests included. Adding an exemption there would just be a way around the rule, so I didn't. The last round already flagged this as needing your decision. Until you decide, CI stays red whatever facet a round closes, and I can't count a doc-only facet as progress under a red verdict that names something else.

**A second problem you need to decide on:** the acceptance tests don't match ticket #144.
- **Names:** the tests use `list_sessions` / `session_list` / `sessions`. The ticket specifies `list_conversations` / `conversation_list` / `conversations`.
- **Store without `listFor`:** the tests expect `{type: 'session_list', sessions: []}` (`conversationList.acceptance.test.ts:150` and `:194`). The ticket says this case must get an `UNSUPPORTED` error and explicitly not an empty list ("grep shows no code path that sends `conversations: []`").
- **Missing pieces:** the tests don't cover the `transport.history` opt-in, the `UNSUPPORTED` code, `StoreCannotList`, or answering ahead of the per-session lock.

The current code passes the acceptance tests as written, so the branch now builds behaviour the ticket rejects. One fix is to correct the acceptance tests to match the ticket and clear the lint finding in the same edit. The other is to amend the ticket to match the tests.

**Red tests from CI's verdict:** 0 are mine, since I wrote none, and 0 are regressions. The only failure is the lint error in the acceptance test.

**Still open in `.lore/dod.md`:** the §5 `session_list` field table in `specs/hal-engine-websocket-protocol/spec.md`. Its naming depends on how you settle the mismatch above.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI's only red finding (re-lint/prefer-early-return at conversationList.acceptance.test.ts:67) is inside the acceptance test, which a round may not edit, and the acceptance tests contradict ticket #144 (list_sessions/session_list and an empty list where the ticket requires list_conversations/conversation_list and UNSUPPORTED). The owner has to decide."}}