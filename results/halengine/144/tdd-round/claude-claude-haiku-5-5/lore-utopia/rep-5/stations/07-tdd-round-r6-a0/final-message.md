Round 1 of #144 is pushed: the CI findings from the last push are fixed, and the `src/index.ts` re-export facet is closed. The branch is up to date with its upstream and `origin/main` was already merged, so there was nothing to push for the merge.

**CI findings fixed (lint and spec-names, not test failures):**
- `eslint` flagged the bare `list_sessions` test at line 145 as having no spec link. The statement in `specs/hal-engine-conversation-list/spec.md` cited line 142, which was stale.
- `spec-names` flagged three stale `#Lnn` citations. I ran `npm run spec:names -- --fix`, which repointed them to lines 75, 116 and 145. The check now passes, and `check:spec-links` and `check:spec-status` pass too.

**The round's facet:** I re-exported `ListSessionsMessage`, `SessionListMessage` and `SessionSummaryFrame` from `src/index.ts` and ticked the facet in `.lore/dod.md`.

**Test-first did not work for this facet.** I wrote a test importing the three types from the package root and ran it with the repo's ESM flag. It passed before the export existed, because ts-jest transpiles and erases type-only imports, so the test could not go red. I reverted it rather than keep a vacuous test. The export is therefore unverified by any test here. CI's typecheck is the only check that would catch a missing export, and it has not run yet.

**Tests:** I did not run any acceptance test. The only test run here was the reverted `src/index.test.ts` check, which passed without the change. CI's verdict on this push decides the state.

**Regressions:** the previous CI verdict named no red tests, so 0 red tests were mine and 0 were regressions.

**Left open, not touched:**
- The `specs/hal-engine-websocket-protocol/spec.md` documentation facet is still unchecked. That spec does not yet mention `list_sessions` or `session_list`. This is the next facet.
- The `session_list` names in `dod.md` and the spec don't match the ticket's `conversation_list` naming. I didn't change either; the acceptance tests use the `list_sessions` names.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"re-export list_sessions frame types from src/index.ts","tdd_next":"document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md"}}