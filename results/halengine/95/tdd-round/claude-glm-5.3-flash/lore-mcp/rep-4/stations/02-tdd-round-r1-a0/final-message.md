Round complete — everything landed and the branch is in sync with its upstream.

**What this round delivered** (repairs first, per the brief, then the last facet):

1. **`no-catch-as-control-flow`** (`chatOrchestrator.ts:344`) — extracted `stringifyRejection`, a status-returning probe around only the throwing call (`catch { return undefined; }` — the sentinel shape the rule's own docstring blesses); `describeRejection` now maps the probe's result, with identical behaviour (`undefined` input still renders `non-error rejection: undefined`, cycles still fall back to `String()`).
2. **`no-duplicate-code`** (8 lines shared between `chatOrchestrator.test.ts:313` and the acceptance file) — extended `recordingHooks` with an optional `seen` error sink and extracted `rejectionTurn`, which drives a rejecting turn and reports outcome, hook order, and the error `onError` saw; the flagged test now uses it with its assertions unchanged, and the acceptance file keeps its self-contained `turnOutcome`.
3. **`no-nondeterministic-tests`** (`onErrorNonError.acceptance.test.ts:12`) — `new Date()` replaced with a fixed `SENT_AT` constant, matching the unit test file's existing idiom.
4. **Facet closed** — pinned the `undefined` rejection: new test `wraps an undefined rejection in an Error for onError while the caller still receives undefined` asserts onError fires once with an `Error` whose `cause` is `undefined` and message `'non-error rejection: undefined'`, `afterSession` following, and the caller still receiving `undefined`. Green immediately (the coercion already covered it — a pin, as dod.md predicted); it discriminates the old `instanceof` gate, which would have yielded `callOrder: ['afterSession']` and `isError: false`. dod.md facet ticked.

**Traceability** — the spec's non-`Error` statement now names `undefined` and cites the new test; `check-spec-anchor-names --fix` repointed 32 citations by name (exit 0, 605 all naming their tests), and `repoint-spec-anchors --check origin/main` is clean (601 up to date, 0 stale). Prettier ran over the changed TS files (all unchanged — already formatted).

**Tests**: I ran only my file, `src/orchestration/chatOrchestrator.test.ts`, under a deadline — 27/27 after the repairs, 28/28 after the pin. No acceptance test, lint, typecheck, or build was run here; CI judges the push. **Red tests: 0 mine, 0 regressions** (the four findings were eslint repairs; the existing 26 tests stayed green and unedited).

**Unrelated smells noticed, not acted on**: `rejectingWith` in the acceptance file is a near-twin of `createErrorProvider` in the unit test file (below the clone threshold, unflagged) — left as is, since a self-contained acceptance test is the point; and `rejectionTurn`/`turnOutcome` remain deliberately parallel across the two files for the same reason.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pin the undefined rejection (plus all four eslint findings from the CI verdict)","tdd_next":"acceptance green"}}