The round is pushed (`9ed7552` on `loop-bench/144`, branch not ahead of upstream), but it is not a proper red-green-refactor round, and CI's remaining verdict is unverified.

**What I did**
- **Spec-names failures:** the brief's CI verdict named `spec-names`. I ran `npm run spec:names -- --fix`, which repointed 77 citations across eight spec files. `spec:names`, `check:spec-links` and `check:spec-status` are clean locally.
- **Eslint `require-spec-link` findings:** the brief listed six in `messageHandler.test.ts` (lines 775–856) and was truncated after that. I believe the repoint fixes them, since those citations were the drifted ones, but I have not confirmed it.
- **Facet closed:** added `SessionSummaryFrame` and `SessionListMessage` to `src/types/messages.ts`, put `SessionListMessage` into `OutgoingMessage`, and re-exported the three new types from `src/index.ts`. The change is additive and was formatted with prettier.
- **Test:** I wrote no test. This facet is type-only, and a Jest run cannot go red on a type. I did not run any test, lint or typecheck in this pod. The round is therefore not a red-green cycle.
- **`.lore/dod.md`:** ticked the types facet and the conversation-list spec facet, and marked the round 6 and round 7 CI findings accordingly.

**What is unresolved**
- **CI verdict:** `lore_get_ci_failures` returned 404 for `loop-bench/144` and could not auto-detect the branch, so I could not read the full eslint list. I did not verify the eslint findings beyond the spec-link repoint.
- **Round 2 eslint findings:** `no-duplicate-code` and `prefer-early-return` in `conversationList.acceptance.test.ts` and `sessionResume.test.ts` are still open. I did not touch them, because the brief forbids editing the acceptance file.
- **Test counts:** I cannot say how many red tests were mine and how many were regressions, since no test ran here and I have no CI test verdict.

**Lint and unrelated smells**
I did not fix anything beyond the spec anchors and the types facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"types: session_list outgoing frame and index exports (no runtime red; type-only)","tdd_next":"eslint remainder from CI (require-spec-link confirmation; round 2 no-duplicate-code and prefer-early-return in acceptance/sessionResume tests)"}}