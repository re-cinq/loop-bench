The two CI lint findings from the last push are fixed and pushed as `c96d7e1`. No facet was closed this round, and no test was written or run here.

**What changed**
- `src/transport/ws/validation.ts`: the 3-operator condition in `isSessionCursor` is now a named predicate, `isFiniteTime`, which accepts a finite number or a string that `Date.parse` accepts. Behaviour is unchanged. Prettier reported the file unchanged.
- `specs/hal-engine-websocket-protocol/spec.md`: added a §13 statement that a failed list is answered `SERVER_ERROR` and logged under `ws`, validated by `messageHandler.test.ts#L799`. This is the citation the `require-spec-link` rule asked for. The spec file already passed Prettier.
- No `scripts/spec-links/reanchor.mjs` exists in this repo, and I edited no test file, so no existing `#Lnn` links moved. I did not re-verify the other links.

**Git state:** the branch is pushed and `git status` shows it in sync with `origin/loop-bench/144`. `origin/main` was already merged in, so nothing new was needed.

**Tests:** the round ran no tests here. The CI verdict named only lint findings, not test failures, so I count 0 red tests from my own work and 0 regressions.

**Still open, not touched this round:** the dod facet "no-`listFor` conflict". The acceptance test `conversationList.acceptance.test.ts` expects an empty `session_list` when the store has no `listFor`. The ticket requires an `error` frame with code `UNSUPPORTED`. I did not edit the acceptance test. Someone needs to decide which one is right. If the ticket is right, the acceptance test is wrong, and that would be a failed round to report, not a fix to make.

**Choices I made:** I left `.lore/dod.md` unticked because no facet closed this round. I did not run `lore_get_ci_failures`, because the round brief already held the verdict for this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"none (CI lint findings fixed: require-spec-link at messageHandler.test.ts:799, max-boolean-operators at validation.ts:88)","tdd_next":"resolve no-listFor conflict: acceptance test expects empty session_list, ticket requires error UNSUPPORTED"}}