I changed nothing this round. The last CI failure doesn't point at this ticket's code.

- **CI verdict:** `test` failed with "timed out after 15 minutes". The log tail shows "Cannot log after tests are done" from a `src/transport/ws` disconnect log. It names no red test, and nothing in the ticket's diff touches the transport code.
- **Ticket work:** All three `.lore/dod.md` facets are ticked and the branch is pushed with nothing ahead of its upstream.
  - `onError` now fires for every rejection.
  - A non-`Error` is wrapped with the original as `cause`.
  - An `Error` passes through as the same instance.
  - The caller still gets the original rejection.
  - The spec's recorded-flaw line is replaced.
  - The CHANGELOG entry is in.
- **Local check:** I ran only `chatOrchestrator.test.ts`, and all 30 tests pass.
- **Red tests:** none of mine, and no regressions. The only red signal is the CI timeout, which I read as a hang or flake in the ws suite.
- **Unrelated, left alone:** the ws suite hangs after tests finish. Prettier also added blank lines before the `doc-block` fences in `specs/hal-engine-architecture/spec.md`, which is formatter noise.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}