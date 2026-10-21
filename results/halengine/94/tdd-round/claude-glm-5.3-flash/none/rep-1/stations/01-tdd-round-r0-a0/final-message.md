Round complete and pushed. Summary:

**Facet closed:** the green phase for #94 — moved the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts:92`, so a throw from it now reaches the same `catch`/`finally` as any other turn failure: same rejection at the caller, `onError` fires with the error, `afterSession` fires after it. The edit is a 2-for-2 line swap, so the spec's `#L148`/`#L150` anchors and the test's `#L40` anchor all still land on their declarations; `node scripts/repoint-spec-anchors.mjs` reported 589 up to date, 0 unresolved (it skips the config-hooks spec itself, whose anchor set is new on this branch — hand-verified instead).

**Also this round:** CHANGELOG entry under `[Unreleased] → Changed` stating what changes for an existing consumer (with a migration note covering both `onError` seeing a new failure class and `afterSession` running on turns where `beforeSession` never allocated); ticked all three facets in `.lore/dod.md` — the spec statement was already rewritten by the previous round and records the "a hook can assume the turn aborted before any provider interaction" answer — and left the acceptance-test box unticked for CI.

**Tests:** this round ran no tests here. The guard refused the acceptance test by name (CI's to run), and the pod's jest cannot run this suite at all — `npx jest src/orchestration/chatOrchestrator.test.ts` fails at suite load with `Must use import to load ES Module` (0 tests ran; a transform/environment failure, not my change). The green bar is CI's to publish on this push; no red tests are mine and none are known regressions, because nothing executed here to redden.

Smells noticed, not acted on: none beyond the two the ticket already scopes out (the `instanceof Error` gate on `onError`, usage accounting across tool rounds).

Committed as `14a8ae9`, pushed; `origin/main` merge was a no-op and the branch is up to date with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"move beforeSession inside the try so onError and afterSession fire when it throws","tdd_next":"acceptance green"}}