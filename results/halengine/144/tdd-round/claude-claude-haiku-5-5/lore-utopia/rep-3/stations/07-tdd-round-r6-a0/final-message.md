This round fixed part of the red eslint verdict and pushed, but the build will likely stay red.

**What I did**
- **`messageHandler.test.ts`** (lint findings at :95 and :108/:139): I pulled the duplicated `ws`/orchestrator/session setup in the `list_sessions` tests into one `listing()` helper. The ISO-dates test now sits at line 104.
- **`specs/hal-engine-websocket-protocol/spec.md`**: added § 5.9 `session_list`. Its statements cite the ISO-dates test (L104) and the failing-store test (L142). `check-spec-links` reports `misplaced: 0`. The § 4.3 `list_sessions` citations were already in place.
- **`.lore/dod.md`**: the websocket-spec facet is done. The facet also covers `specs/hal-engine-conversation-list/spec.md`, which I have not touched, so the box stays unchecked and says so.
- Formatted with prettier. Prettier also reflowed existing tables in the websocket spec, so that file's diff is larger than the new section alone.
- Committed and pushed to `loop-bench/144`. The branch is up to date with its upstream. `origin/main` produced no merge.

**What is still red and why I left it**
- `conversationList.acceptance.test.ts` (`no-duplicate-code` at 23, 33, 80; `prefer-early-return` at 67) and `sessionResume.test.ts` (`no-duplicate-code` at 51, 63, 167). The acceptance file is one I must not edit, and `sessionResume.test.ts` is an existing test the dod says not to touch this round. These need a decision from you, not a silent edit.
- The CI verdict in the round brief is truncated, and the lore API would not return it for branch `loop-bench/144`. Findings past `messageHandler.test.ts:139` are unknown to me.
- The eslint CI step is the only failure I can see. The "Test" step failure noted in dod is still unidentified.

**Tests:** I ran no tests in this pod. The `messageHandler.test.ts` refactor is unverified until CI runs it.

**Regressions vs. red tests I wrote:** none of the failing tests are ones I wrote this round. I did not check CI's test-step verdict, so I can't count regressions.

**Smells noticed, not fixed:** the dod facet list has drifted from the brief's findings (round numbering, multiple facets marked done whose spec work is partial). The websocket spec's header `Status` is still `In Progress`, which is correct until its statements cite tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in the websocket protocol spec (§4.3, §5.9)","tdd_next":"Document list_sessions and session_list in specs/hal-engine-conversation-list/spec.md; resolve the eslint no-duplicate-code and prefer-early-return findings in the acceptance and sessionResume test files"}}