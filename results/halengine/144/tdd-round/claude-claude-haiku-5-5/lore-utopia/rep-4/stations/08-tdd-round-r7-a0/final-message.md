This round was CI repair, not a new red-green facet, and the CI verdict was only partly readable.

**What I could read.** The round brief's CI section was truncated after `messageHandler.test.ts:759`, and `lore_get_ci_failures` returned 404 for the branch, the commit SHA, and no-arg lookup. So the `test` and `spec-names` findings are unknown to me, and the eslint list past line 759 is unseen.

**What I fixed:**
- **Stale spec citations (`spec-names`).** `check-spec-anchor-names` reported 79 citations pointing at old line numbers across seven spec files. I ran its `--fix` mode, which repoints each citation by test name. A re-check now shows 802 citations, none stale.
- **`messageHandler.test.ts` lint findings.** The five `require-spec-link` findings at 678–742 were citations that the name repoint now resolves. The `max-expects` finding at 759 is fixed: the `list_sessions` happy-path test now makes one `toEqual` assertion.
- **Uncited `list_sessions` test.** Added a statement to `specs/hal-engine-websocket-protocol/spec.md` §12 saying the list comes from the connection's user, not a frame `userId`, with a `validated by` citation to that test.
- **`.lore/dod.md`.** Ticked the spec-anchor facet.

**Checks run here:**
- `messageHandler.test.ts` passes, 55/55, via `node --experimental-vm-modules node_modules/jest/bin/jest.js`.
- `check-spec-anchor-names` is clean. `check-spec-status` and `check-spec-links` report zero findings.
- Prettier was run on the changed files.
- Not run: eslint, typecheck, the full suite, and the acceptance tests.

**Red-test accounting:** I can't tell how many red tests were mine versus regressions, because the CI verdict is truncated. I know of no regression.

**Delivery:** committed as `fix(transport): repoint stale spec citations and cite list_sessions test (#144)` with the Haiku co-author line. I merged `origin/main` cleanly with no conflicts. The push landed, and `git status` shows the branch in sync with its upstream.

**Still open in the dod:**
- The `list_sessions` error path (`SERVER_ERROR` plus a `ws` error log).
- The conflict between the acceptance test (empty `session_list` when the store has no `listFor`) and the ticket (answer `error`, `UNSUPPORTED`). That needs a decision.
- Spec documentation for `session_list` in `hal-engine-conversation-list`.

Next round should read the full CI verdict first, since the brief's list is incomplete.

**Unrelated smells noticed, not acted on:** the spec-citation drift itself. Every new insertion in `messageHandler.test.ts` shifts the `#Lnn` links, so the repo's own `--fix` is the real fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec anchor for list_sessions unit test (CI lint/spec-names repair)","tdd_next":"list_sessions error path: listFor rejection -> SERVER_ERROR with ws error log"}}