This round's spec work is committed and pushed, and the branch is level with `origin/main`. The CHANGELOG entry is still to do, so the ticket isn't finished.

**The test this round** (`src/orchestration/chatOrchestrator.test.ts:302`, *hands afterSession an untouched session when beforeSession throws, with the provider never called*): when `beforeSession` throws, the provider is never called, and `afterSession` receives a session that still holds only the entries it arrived with.
- It passed on its first run, because last round's code (moving `beforeSession` inside the `try`) already delivers this.
- To check it really tests something, I briefly moved `beforeSession` back above the `try`. The test failed, then passed again once I restored the code.
- I ran only this one test, with jest. I didn't run the acceptance test or the full suite, and there was no round brief, so I have no CI result yet. That means I can't say how many red tests are mine or regressions until CI reports on this push.

**Spec (`specs/hal-engine-config-hooks/spec.md`)**:
- The `beforeSession` statement now sits in a new guarantee section, "A throwing `beforeSession`", instead of the "Measured semantics — out of scope" section. That section's intro now says "two properties".
- It answers the ticket's open question. `afterSession` still runs and is deliberately not told why. Since it gets only the session, it can't tell a failed `beforeSession` from a finished turn. A cleanup should release only what `beforeSession` actually recorded allocating, and a deployer who needs the failure itself reads it in `onError`.
- Adding the test pushed 12 test links in `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md` down by 30 lines. I fixed them by hand, since this repo has no `reanchor.mjs`.
- There is nothing to stamp in the test itself: this repo records which spec a test validates only through links in the spec.

In `.lore/dod.md` I ticked both spec facets. The CHANGELOG facet is next.

**Not touched:** the link in `AGENTS.md:138` to `chatOrchestrator.test.ts#L42` ("commits every entry before the next user message") doesn't match any test title in that file. It predates this branch, so I left it alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update spec with the beforeSession failure guarantee and move it out of the out-of-scope section","tdd_next":"Document in the CHANGELOG what changes for an existing consumer"}}