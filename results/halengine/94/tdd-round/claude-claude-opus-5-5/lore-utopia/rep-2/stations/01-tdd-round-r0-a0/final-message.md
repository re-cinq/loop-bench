I moved the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`. A throw from it now reaches `onError` and `afterSession` and still rejects at the caller. The commit is `1b08a02`; it's pushed, already up to date with `origin/main`, and not ahead of its upstream.

- **Red:** I added one test, "called with the error a throwing beforeSession raised", at `src/orchestration/chatOrchestrator.test.ts:284`. Before the fix it failed because `onError` never got the error.
- **Green:** I ran only that file with Jest: 24 of 24 pass, including the existing `beforeSession` and `afterSession` tests. I didn't edit any of those. I didn't run the acceptance test; CI will.
- **Red count:** 1 red test this round and it was mine; 0 regressions. There was no round brief, so I have no CI verdict to go on yet.
- **Spec links:** I linked the new test from the `beforeSession` statement in `specs/hal-engine-config-hooks/spec.md`. Adding the test moved 12 line links in the architecture and tool-input-validation specs; `scripts/repoint-spec-anchors.mjs` updated them all, with none it couldn't place.
- **Spec anchor:** this repo's test listing has no way to stamp a test with its spec anchor, so the link in the spec is the only traceability.
- **dod.md:** I ticked the "move into try" facet and added a new one. The spec lists the `beforeSession` statement under "Measured semantics — out of scope", whose intro says "This issue changes none of them". That statement needs to move into a normative section. It also needs to say whether `afterSession` can tell a session that never started from one that finished.
- **Still open:** the spec update and the CHANGELOG entry.

I didn't act on anything outside this facet. Two related things I left alone: the `instanceof Error` gate on `onError` (out of scope for this ticket), and the hand-written line links to `chatOrchestrator.ts#L148` and `#L150` in that spec, which only stayed correct because the move didn't change the line count.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee (move it out of the out-of-scope section) and add the CHANGELOG entry"}}