This round is committed and pushed. The branch is level with `origin/loop-bench/95` and already contained `origin/main`, so the merge brought in nothing.

**What I closed:** an `onError` call for a rejection that is a plain object now gets an `Error` whose message is the object's JSON (`{"code":503,"detail":"upstream down"}`) instead of `[object Object]`.

- **Red:** I added `gives a thrown plain object a message that reads its fields` to `src/orchestration/chatOrchestrator.test.ts:327`. It failed with `Received: "[object Object]"`.
- **Green:** I added a small `describeRejection` helper in `src/orchestration/chatOrchestrator.ts`. Strings, `undefined` and other non-objects go through `String`. Objects go through `JSON.stringify`, and anything JSON can't render (circular objects, for example) falls back to `String`. The original value is still kept as `cause`, and the caller still receives the rejection unchanged. All 28 tests in that file pass.
- **Refactor:** nothing needed.
- **Traceability:** the statement in `specs/hal-engine-config-hooks/spec.md` now describes the readable message and links the new test. All its links now sit at the end of the sentence, which the link checker requires. I also re-pointed the line links in other specs that the inserted test had shifted.
- **Checklist:** I ticked the facet in `.lore/dod.md`.

**Tests:** I ran only my own test file here, not the acceptance tests. There's no CI verdict on this push yet, so I can't count red tests or regressions; there was no round brief from the previous push either.

**Two things I noticed but left alone:**
- **Off-by-one links (fixed):** the spec's links to the acceptance tests pointed at #L52 and #L63, but the tests are on lines 53 and 64. Because they were on the statement I was editing, I corrected them.
- **Acceptance test too loose (not touched):** the plain-object acceptance test only checks that the message isn't empty. `[object Object]` would already have passed it, so this round's test is what actually pins the readable message.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Give a plain-object rejection a readable message in the wrapper (JSON, falling back to String)","tdd_next":"Add a CHANGELOG.md entry under ## [Unreleased] describing the behaviour change for existing consumers"}}