I made no changes this round and pushed nothing. The red build is a 15-minute timeout on the whole `test` job, and I can't fix it within this round's rules.

**Where the ticket stands:** all of its own facets are done and committed. The branch is pushed, up to date with `origin/main` and has nothing unpushed.
- `src/orchestration/chatOrchestrator.ts` now calls `onError` for every rejection. Anything that isn't an `Error` is wrapped in one, with the original kept as its `cause`. An `Error` is passed through as the same instance, and the caller still gets the original rejection.
- There are unit tests for a string, `undefined`, and an `Error` passed through unchanged, plus a CHANGELOG entry and the spec update.

**Why the build is red:** CI's verdict on `cfeb4e0` is that the job printed its coverage table and then never exited. No file or line is named. The only clue is a log line from the WebSocket server code (`src/transport/ws/connectionHandler.ts:104`) printed after the tests had finished. This branch doesn't touch that code: its diff is the orchestrator, its tests, specs, CHANGELOG and `.lore/dod.md`. The timeout itself comes from the benchmark's CI runner, not from `ci.yml`, which has no such limit.

**What I checked:** I read the WebSocket test suites and their shared helper, the server's heartbeat timer and stop path, and the MongoDB test helper. All of them close what they open, so nothing in the source points to what kept the process alive. Finding it would mean running the WebSocket suites or the full suite with open-handle detection. This round's rules forbid both, since I may only run a test I wrote, and I have none to write: the remaining work isn't a behaviour I can express as a test. The previous round already pushed again with no code change (`bc486c0`) and the brief still names `cfeb4e0`, so a third push with nothing new would only spend another CI cycle.

**Red tests:** none named. CI's verdict lists no failing tests from me or from existing suites, just the job timeout.

**Tests run here:** none.

**Unrelated issue, not acted on:** some WebSocket suite logs `disconnected` after its tests have finished. That points to a server-side close that the suite's cleanup doesn't wait for, in code on `main`, and probably deserves its own issue.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"CI test job times out after printing coverage (process never exits) with no named file:line, in transport suites this branch does not touch; finding the open handle needs running suites this round may not run"}}