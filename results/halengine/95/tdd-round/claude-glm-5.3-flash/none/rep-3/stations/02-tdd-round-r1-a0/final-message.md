Pushed; branch is even with its upstream and `origin/main` merged clean (already up to date).

## Round report

**CI findings repaired (owed before anything else):**
- `src/orchestration/chatOrchestrator.ts:294` `re-lint/no-catch-as-control-flow` — `messageOf`'s catch swallowed the error and returned a call result. Restructured into the shape the rule's own message prescribes: only `JSON.stringify` is wrapped in a status-returning probe (`tryStringify` returning `null` on throw), and the fallback `String(thrown)` moved outside the try. Behaviour is identical — `stringify` returning `undefined` still falls through to `String()`; only a throw yields `null`.
- `src/orchestration/onErrorNonError.acceptance.test.ts:12` `re-lint/no-nondeterministic-tests` — the `new Date()` clock read replaced with a fixed ISO string.

**Facet closed:** dod.md facet 4 — pinned that a rejection with `undefined` reaches `onError` once, as an `Error` with `cause` actually installed and `undefined`, `afterSession` following, and the caller still receiving the raw `undefined` rejection (`throw error` at `src/orchestration/chatOrchestrator.ts:151` rethrows the original value). The spec statement now names `undefined` and cites the new test at #L82; the existing #L53/#L64 links keep their lines, and `chatOrchestrator.test.ts#L311` was re-verified. All four dod facets are now ticked.

**Tests run here: none.** The pod's guard blocks the acceptance file by name even scoped with `-t`, so my test is verified by reading the code path and CI's verdict on the push is the bar. The two lint fixes were checked against the rule's source, not a lint run (the linter does not fit this pod). **Red tests: 0 mine, 0 regressions** — the brief named only eslint findings, no failing tests.

**Noted, not acted on:** the `error instanceof Error ? error.message : String(error)` coercion at `src/orchestration/chatOrchestrator.ts:358` duplicates `asError`'s concern at another seam — a candidate to share the wrapper once this ticket lands.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"undefined rejection reaches onError with cause: undefined, plus both eslint findings from the round brief repaired","tdd_next":"acceptance green"}}