Round complete. Summary:

**Facet closed:** dod facet 1 — `onError` now fires for every rejection inside the orchestrator's `try`. A non-`Error` rejection is wrapped (`asError` in `src/orchestration/chatOrchestrator.ts:172`) with a readable `message` (a thrown string keeps its text; anything else gets a JSON/`String` description) and the original preserved as `cause`; an `Error` instance passes through untouched and the caller still receives the raw rejection, per the ticket. Facet 2 confirmed locally: the three existing `Error`-instance tests stayed green, unedited. Facet 3 closed: CHANGELOG entry under `## [Unreleased]` → **Fixed** with a migration note for existing consumers.

**TDD bar:** my test `fires for a thrown string, wrapping it as cause on the Error it receives, and rethrows the string unchanged` (`src/orchestration/chatOrchestrator.test.ts:311`) failed red for exactly the predicted reason (`onError` skipped: `isError: false`), then the file went green 27/27 after the fix.

**Traceability:** spec `specs/hal-engine-config-hooks/spec.md` statement extended to state the `cause` guarantee and cites my test; the two pre-existing rotten anchors the previous round left (L52/L63 landing on `describe(`/blank) and every anchor shifted by my insertion were repointed via `repoint-spec-anchors.mjs` + `spec:names:fix`. Spec `Status` stays `Shipped` (all statements still cited).

**Not run here, by rule:** the two acceptance tests in `onErrorNonError.acceptance.test.ts` (CI judges them — with this push they should go green), lint, typecheck, build; prettier ran over the two changed `.ts` files only. `lore_get_ci_failures` returned `branch not found` and no round brief exists, so there was no CI verdict to reconcile. Red tests: 1 (mine); regressions: 0.

**Noted, not acted on:** (1) `describeRejection` will happily produce an enormous `message` if a library rejects with a huge response body — a length cap may deserve its own issue; (2) `outcomeOf` in the test file maps rejections to `error.message`, so it can't distinguish a raw non-Error rejection and shouldn't be reused for this seam; (3) `saveSession`/`consultPolicy` each re-implement small `instanceof` coercions for log lines — similar text, not duplicated knowledge.

**Next facet (appended unchecked to dod.md):** pin the `undefined` rejection (acceptance criterion 2's tail) reaching `onError` as an `Error` with non-empty `message`.

Pushed as `13eacb9`; branch is level with its upstream and already up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"onError fires for every rejection — non-Error wrapped with readable message and original as cause, Error passed through, CHANGELOG entry added","tdd_next":"pin undefined rejection reaching onError (criterion 2's tail), else acceptance green"}}