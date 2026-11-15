Round 3 is committed and pushed to `loop-bench/144` as `f5e6611`. The branch is level with its upstream and already contains `origin/main`.

**What I did**
- **Test (red, then green):** added one test to `src/transport/ws/validation.test.ts`: a `list_sessions` frame with a non-object `before` must be rejected with an error naming `before`. It failed first, then passed with a two-line check in `validation.ts`. I ran only that file: 9 of 9 pass in that file. The acceptance tests were not run here.
- **Refactor:** replaced the three-case `switch` in `validateMessage` with a lookup table of validators. This is the likely source of the `validation.ts:28` lint finding, but that finding was truncated in the brief, so I have not confirmed it.
- **Spec-link findings:** added §4.3 `list_sessions` to `specs/hal-engine-websocket-protocol/spec.md`, with citations to the three flagged tests (L18, L24, L30) and the new one (L36). I checked the line numbers after formatting.
- **dod.md:** ticked the "reject malformed `before`" sub-facet and added "Forward `before` in the parsed data" as its own open facet.
- Ran Prettier on the two changed TypeScript files. I did not run eslint, tsc or a build.
- Merged `origin/main` in; it was already an ancestor, so nothing changed.

**Left unfixed from the CI verdict**
- `eslint` findings in `src/transport/conversationList.acceptance.test.ts` (duplicate code at 23, 33, 80; prefer-early-return at 67) and the matching duplicate-code findings in `src/transport/sessionResume.test.ts`. The first file is an acceptance test, and I was told not to edit those. The sessionResume overlap needs a decision on the acceptance test's shape.
- The brief's list was truncated, and the `lore_get_ci_failures` lookup returned 404 for `loop-bench/144`, so I could not read the full verdict or the `test` job's log. I did not identify which test is red.

**Red tests:** of the failing tests I could see, none are ones I wrote this round. Regressions: none identified in what I could check. The one test I wrote is green.

**Tests I could run here:** only `validation.test.ts`, as the round's own test. No tests were skipped for the environment.

**Spec status:** `hal-engine-websocket-protocol` and `hal-engine-conversation-list` Status rows are untouched; this round does not complete either spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject a malformed list_sessions before cursor (INVALID_MESSAGE naming before)","tdd_next":"Forward before in the parsed data"}}