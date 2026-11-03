Closed the `limit` validation facet for `list_sessions` this round and pushed it to `loop-bench/144`; the branch is no longer ahead of its upstream.

**What changed**
- `src/transport/ws/validation.test.ts`: one new test. It forwards `limit: 10` and rejects `0`, `201`, `1.5` and `'10'`, with the error naming `limit`. It failed first, because `limit` was being dropped.
- `src/transport/ws/validation.ts`: a `validateListSessionsMessage` helper. A missing `limit` gives the bare frame, an integer 1–200 is forwarded, and anything else is invalid. Prettier re-wrapped the new condition.
- `.lore/dod.md`: ticked the `limit` facet.

**Tests**
- The new test went red, then green. The validation file passes 5 of 5 using the repo's own Jest command (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath`). The brief's Vitest command doesn't apply here, since this repo runs Jest.
- I did not run the acceptance file `src/transport/conversationList.acceptance.test.ts`, as instructed. CI judges that.
- No `round-brief.md` exists, so there was no CI verdict to act on. Regressions: none known. Red tests I wrote: none remain.

**Choices to check**
- The dod facet said `limit` is a "non-negative integer", but the ticket says 1–200. I followed the ticket and rewrote the facet text in `dod.md` to say so. If the non-negative reading is right, `0` would need to pass.
- The `before` validation was not touched this round.

**Not done, flagged**
- Traceability and spec links: none of the spec statements changed this round, so nothing to re-anchor.
- The lore trace for `validation.ts` returned no covering tests. That is consistent with the test file being new.
- No unrelated smells noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions limit (integer 1-200, else INVALID_MESSAGE)","tdd_next":"validate list_sessions before (cursor with sessionId 1-128 chars and parseable updatedAt)"}}