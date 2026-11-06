I closed the last open facet: a test that an `Error` rejection reaches `onError` as the same instance, not a wrapper (ticket criterion 3). It's committed and pushed, `origin/main` brought nothing new, and the branch is level with its upstream.

**The CI failures in the brief:** they are for commit `4c38633`, not the current branch tip. All five eslint findings and the spec-names, spec-links and changelog failures were already fixed by the previous round's commit `adbbe96`. I checked each finding against the current code rather than rerunning anything. CI has not yet judged `adbbe96` or this round's push. Red tests in that verdict: all came from this ticket's own work, and none were regressions.

**This round:**
- **Red:** the code already passes an `Error` straight through, so the new test pins existing behaviour. To show it can fail, I temporarily changed the code to wrap every rejection; the test went red at `chatOrchestrator.test.ts:366`, and I put the code back.
- **Green:** with the real code, the new test passes when run alone. Nothing needed refactoring.
- **New test:** "hands onError the very Error instance that was thrown, not a wrapper", at `src/orchestration/chatOrchestrator.test.ts:354`.
- **Spec:** in `specs/hal-engine-config-hooks/spec.md` I split the old combined statement so the same-instance guarantee carries its own link to the new test.
- **Spec links:** inserting the test moved 15 links. The repository's re-anchor script fixed 14; I fixed the other one and my new link by hand. The repository's spec-link and link-name checkers report no problems.
- **`.lore/dod.md`:** the facet is ticked. Every facet is now ticked; the two acceptance tests are still CI's to judge.

**Smell (not acted on):** the older `Error` tests only compare the message, so they would not catch `onError` getting a wrapper. Only the new test pins the same instance.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Pin that an Error rejection reaches onError as the same instance, not a wrapper (ticket AC 3)","tdd_next":"acceptance green"}}