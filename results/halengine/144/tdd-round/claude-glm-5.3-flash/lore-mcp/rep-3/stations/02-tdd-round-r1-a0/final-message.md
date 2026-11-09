Round complete. The branch is pushed, merged with `origin/main` (no drift), and clean.

## What this round delivered

**All CI findings from the last push, first:**
- **eslint (13 errors, all fixed)** — `validation.ts`'s 3-way switch became a `validators` lookup table and both nested ifs flattened into guards with an extracted `isTimestamp` predicate; `validation.test.ts` now pairs each refused frame with the field its message must name (removing the clone while strengthening the assertion) and the vague `data` binding is aliased; the socket helpers both suites duplicated (`eventually`, teardown drain, `delegatingTo`, client/server tracking) moved into `wsTestSupport.ts`; the acceptance file's frame handler flipped to guard clauses.
- **test** — implemented the missing facets and all three acceptance tests in `conversationList.acceptance.test.ts` pass now (stable across repeated runs). Red tests that were mine: the unit test I wrote this round (red, then green) plus the three red-by-design acceptance tests, now green. **Regressions: zero** — every suite my edits touch ran green (125 + 87 tests).
- **changelog** — an installer-facing entry under `## [Unreleased]` for the two frames.

**The TDD round (facet: thread the store, answer `list_sessions` off the lock):** one new unit test in `messageHandler.test.ts` — `listFor` is called with the socket's user and never a frame-claimed `userId`, dates serialised — written first and red. The least code to pass it: `createMessageHandler(orchestrator, sessionStore?)`, answering beside `ping` with ISO-serialised summaries, `sendSessionList` in sender.ts, wired in `createServer.ts`. Testing exposed a real race: a store rejection landed after the pong when both frames arrived in one TCP chunk, so non-turn frames now answer on their own per-session chain in arrival order, which makes the pong barrier deterministic instead of packet-luck.

**Also:** spec anchors repointed (107 by the repo's script, 3 hand-fixed in the conversation-list spec), dod facets 1/3/4 ticked, and the one docs section my dispatch change invalidated (`docs/adding-a-message-type.md` taught adding a switch case) corrected.

**Not run here, per pod rules:** eslint, typecheck, build — CI judges those; prettier was run and everything is formatted. Spec checkers (`spec:names`, `check:spec-links`, `check:spec-status`) and the anchor check all pass locally.

**Smells noticed, not acted on:** `answerFrame`'s sibling type dispatch is one case from the polymorphism threshold that caught `validation.ts`; a slow `listFor` now delays that session's pong (bounded by the store's own timeout); `startEngineWith` returns a `/c1`-suffixed URL that suites wanting a bare `/ws` base can't use, which is why both list suites keep their own `createServer` calls.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"thread sessionStore through createMessageHandler and answer list_sessions off the lock with ISO-serialised summaries (dod facets 1, 3, 4), plus every eslint/test/changelog finding from the last push","tdd_next":"facet 5: document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md"}}