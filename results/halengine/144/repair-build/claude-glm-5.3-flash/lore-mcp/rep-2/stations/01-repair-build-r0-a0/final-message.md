Done. The branch is green-bound and pushed.

## What was red and what I did

The verdict named two checks: `eslint` (8 errors) and `test` (acceptance suite). The trace graph had no prior failures on these files, and the branch hadn't moved since CI judged `5cd4e67` — so I started from the findings.

**The `test` failure** — the branch was mid-build: the previous round shipped the `list_sessions` types and validation, but nothing answered the frame yet (the round brief's "Next" said exactly this). I:
- Threaded `sessionStore` into `createMessageHandler` (`src/transport/ws/messageHandler.ts:42`) and wired it in `createServer.ts:43`; `list_sessions` is answered beside `ping`, off the per-session lock, with the user id taken from `session.userId` (set at upgrade from `wsAuth`, never from the frame). A store without `listFor` answers `session_list` with `[]`; a rejected `listFor` answers one `error`/`SERVER_ERROR` frame and logs on the `ws` category with `userId` and the store's message; summaries are serialised to ISO strings (`sendSessionList` added to `sender.ts`).
- Found a real defect the tests exposed: the async answer raced the client's pong barrier — different tests failed on different runs. Fixed the cause, not the test: a socket's own non-turn frames are now answered in arrival order (`src/transport/ws/messageHandler.ts:61`), so an answer always precedes a ping sent after it, while turns keep queueing on the session lock. Three consecutive green runs confirm it.

**The `eslint` findings** — all eight: the three `conversationList.acceptance.test.ts` ↔ `sessionResume.test.ts` clones (`servers`/`clients`/`eventually`, the teardown, `delegatingTo`) moved into `wsTestSupport.ts` (`trackServer`, `stopEngines` now drains sockets before stopping); the flagged `if` in `askAfterConnect` flipped so the happy path runs flat; `Array(9).fill(false)` became `Array.from({length: 9}, () => false)`.

**Verification:** I ran only the affected suites with the repo's own runner (`node --experimental-vm-modules node_modules/jest/bin/jest.js <paths>`): the acceptance file (×3), sessionResume, validation, messageHandler, awaitedSessionCreate, sessionSurvivesClose, abandonOnClose, toolDeadline, config, createServer, handshake, malformedUpgrade — 148 tests, all passing. Per the pod rules I did not run eslint or typecheck here; Prettier reports every changed file clean, and `spec:names` / `check:spec-links` / `check:spec-status` all pass after `spec:names:fix` repointed the 31 citations whose test lines moved.

Pushed as `1275511`; branch reports up to date with `origin/loop-bench/144`, and `origin/main` has no commits the branch lacks, so no merge was owed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"list_sessions had no handler (acceptance tests red, one flaky on frame ordering) and 8 lint errors from duplicated test helpers, a wrapped happy path and a boolean fill literal"}}