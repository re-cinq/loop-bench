Round complete. The branch is pushed (`8ec74ea`), in sync with its upstream, and `origin/main` has nothing the branch lacks — no merge required.

**What this round was:** the brief's CI verdict (eslint + changelog on `7f1f04e`) was the work queue, so this was a repair round — no new test written, and the acceptance test's assertions were left exactly as they were while its scaffolding changed.

**Findings fixed (all 11 eslint + changelog):**
- **Duplication** (6 clones across `conversationList.acceptance.test.ts`, `sessionResume.test.ts`, `ws/messageHandler.test.ts`): the socket-lifecycle helpers (`eventually`, the drain-teardown, `delegatingTo`) moved into `wsTestSupport.ts` as a new `socketSandbox()`, and the shared one-conversation fixture (store summary + wire row) became `listedConversation` — killing each clone on both sides.
- **`prefer-early-return`** in the acceptance test: `askAfterConnect`'s frame dispatch now runs guards first, happy path flat.
- **`prefer-polymorphism`** at `validation.ts:29` (the truncated finding — the three-case tag `switch` this branch created): dispatch is now guard ifs, the idiom `processChunk` already uses.
- **`max-expects`** in `validation.test.ts`: the four-expect test now asserts one object — same 11 frames, same required answers, table-driven.
- **`max-comment-lines`** in `messageHandler.ts`: the two-line comment is the one line that states the constraint (answered off the lock).
- **changelog**: a `list_sessions` entry under `## [Unreleased]`, written for an installer; the adjacent `listFor` bullet's now-false "nothing in the engine calls it yet" was corrected in the same breath.

**Verification:** the three edited unit suites ran green here by file — validation 4/4, messageHandler 55/55, sessionResume 25/25. The acceptance suite ran nowhere in this pod (it is CI's to run); I verified its restructure by inspection instead. Eslint was not run here either, per the pod's limits — CI is the judge. No red tests are mine and none are regressions: CI's failures were lint and changelog only, and no test failed.

**Named, not acted on:** `sessionResume.test.ts` still carries its own `deferredRelease` beside `wsTestSupport.deferred` (under the clone threshold, unflagged); `wsTestSupport.stopEngines` doesn't drain before stopping, unlike the new `sandbox.drain` — unifying them would touch six suites; and the brief's eslint output was truncated mid-`validation.ts`, so any findings on files sorting after it are unseen here — if the next build names more, they lead the next round.

`.lore/dod.md` is current: the lint/changelog facet is ticked, and the next facet is documenting `list_sessions`/`session_list` in the two specs, then the release tail (version bump, `docs:fix`, `verify`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"eslint and changelog findings from CI on 7f1f04e cleared (suite duplication, guard dispatch, one-assert validator test, comment, changelog entry)","tdd_next":"document list_sessions/session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}