This round fixed the two lint errors that turned CI red on 885dd1f. It's committed and pushed, and the branch is level with its upstream. Merging `origin/main` brought in nothing new ("Already up to date").

**The two lint fixes:**
1. **`src/transport/wsTestSupport.ts:117` (`max-member-chain`):** `stopWhenIdle` now pulls `wss` out of the server object first and checks `wss.clients.size`, so the chain is two steps instead of three.
2. **`src/transport/conversationList.acceptance.test.ts:67` (`prefer-early-return`):** I rewrote the message handler inside the `askAfterConnect` helper so it returns early. It behaves the same: the `pong` frame resolves, the `connected` frame sends the request, and any other frame is recorded. I did not touch any assertion. You should know this file is an acceptance test. I edited it because CI's lint findings had to be fixed, and the edit doesn't change what it tests or whether it passes. Earlier rounds had left this one for the test's author.

**Tests:** I wrote no new test this round, since the work was fixing lint findings. I ran `src/transport/sessionResume.test.ts`, which uses the helper I changed, and all 25 tests pass. Red tests: none were mine and none were regressions. CI's last verdict listed only the two lint errors.

**Other notes:**
- The line links in the spec still point at the right tests (#L93, #L134, #L163). `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I checked them by hand.
- `.lore/dod.md`: I ticked the lint facet for the acceptance test and added a ticked entry for the `wsTestSupport` finding.

**Problems I noticed but did not act on:**
- **The branch doesn't match the ticket.** The acceptance tests and `.lore/dod.md` use `list_sessions`/`session_list` and answer an empty list when the store has no `listFor`. The ticket asks for `list_conversations`/`conversation_list`, an `UNSUPPORTED` error code, a `transport.history` opt-in flag, and says explicitly "an error, not an empty list". As built, the branch can't meet several of the ticket's acceptance criteria. Someone should decide which is right before review.
- `.lore/test-commands.yml` says this is a Jest suite, but plain `npx jest` and `npx vitest` both fail on it. Tests only run through `npm test`'s `node --experimental-vm-modules` wrapper.

**Next round:** document `list_sessions`/`session_list` in `specs/hal-engine-conversation-list/spec.md` and the protocol spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI lint findings on 885dd1f: max-member-chain in wsTestSupport.ts:117 and prefer-early-return in conversationList.acceptance.test.ts:67","tdd_next":"Document list_sessions/session_list in specs/hal-engine-conversation-list/spec.md and the protocol spec"}}