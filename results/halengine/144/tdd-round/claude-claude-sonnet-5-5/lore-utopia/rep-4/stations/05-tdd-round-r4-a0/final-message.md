This round fixed the findings in CI's red verdict (eslint and spec-names) and added no new test or facet. The eslint and spec-names checks were not re-run in this pod. Only `sessionResume.test.ts` was run, and its 25 tests pass.

- **eslint member chain:** the `afterEach` in `src/transport/sessionResume.test.ts` read `hal.wss.clients.size`, three hops deep. It now destructures `wss` first.
- **eslint spec links:** the three tests flagged for missing spec links (`still types a connected frame…`, `with resume on but latest off…`, `reads a named id…`) already had citations, but they pointed at stale lines. Re-anchoring fixed them.
- **spec-names:** `npm run spec:names:fix` repointed the stale `#Lnn` citations in `specs/hal-engine-session-resume/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`. After that, `npm run spec:names` reported all 798 citations matching.

I ran the `spec:names` and `spec:names:fix` scripts and the one test file, not the acceptance tests, the linter or the typechecker. All three red checks came from the previous round's changes, none from tests that were passing before. Merging `origin/main` produced nothing new. The branch is pushed and not ahead of its upstream.

**Unrelated smell, not acted on:** `.lore/dod.md` and the code use `list_sessions` and `session_list`. The ticket specifies `list_conversations`, `conversation_list`, the `history` opt-in and `UNSUPPORTED`. Someone should reconcile the two.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: eslint member-chain and stale spec citations in sessionResume.test.ts","tdd_next":"acceptance green"}}