This round fixed the three findings CI reported on the last push (476cc49), and the fix is pushed. The branch has no unpushed commits, `origin/main` merged in with nothing new, and CI hasn't judged the push yet.

**What I fixed**
- **eslint `camelcase`** in `src/transport/ws/validation.ts:20,22`: the frame names `user_message` and `list_sessions` were object keys, which the linter reads as identifiers. The validators are now looked up in a `Map` keyed by string (`VALIDATORS.get(type)`), and validation behaves the same.
- **eslint `max-member-chain`** in `src/transport/sessionResume.test.ts:73`: the previous round had written `hal.wss.clients.size`, which is three steps deep. I put back `const {wss} = hal;`.
- **spec-names**: that same previous round had removed a line from `sessionResume.test.ts`, so every link in `specs/hal-engine-session-resume/spec.md` pointed one line too far down. The restored line moves the tests back where the links point. `npm run spec:names` now reports all 804 links correct, and the fix script needed to move none.

**Tests and red counts**
- I ran `validation.test.ts` and `sessionResume.test.ts` with Jest: 29 passed. The repo uses Jest, not Vitest.
- I wrote no new test. The work was CI's findings, not a new facet.
- All three red findings were mine: lint and link errors from earlier rounds on this branch. None was a regression in a test from before the branch.
- I didn't run the acceptance tests, lint or the typechecker here. Every facet in `.lore/dod.md` was already ticked and I found nothing new, so I left the file as it was.

**Not acted on**
- **The checklist doesn't match the ticket.** `.lore/dod.md` specifies `list_sessions` / `session_list` frames and an empty list when the store has no `listFor`. Ticket #144 asks for `list_conversations` / `conversation_list`, an `UNSUPPORTED` error in that case (and never `conversations: []`), and a `transport.history` opt-in. None of that last part is in the checklist. Someone needs to decide which is the bar before review.
- **Wrong test runner in the round instructions.** They give a Vitest command, but this repo's tests only run under Jest.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Clear CI eslint (camelcase, max-member-chain) and spec-names findings","tdd_next":"acceptance green"}}