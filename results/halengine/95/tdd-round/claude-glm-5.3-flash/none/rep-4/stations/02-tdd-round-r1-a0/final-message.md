Round complete — pushed as `ba941a4`, branch synced with `origin/main`, working tree clean.

**What this round was:** the round brief's CI verdict on `83d834d` was red on typecheck and eslint (7 findings). All findings fixed:

- **typecheck ×3** — `chatOrchestrator.test.ts` read the hook's observation through a `let` that the `turn` closure reset, so control-flow analysis narrowed it to `undefined` and the `instanceof`/`message`/`cause` reads sat on `never`. The observation is now recorded into `receivedByHook: Error[]` and read back as a value (`receivedByHook.at(0)`). Assertions unchanged.
- **`re-lint/no-catch-as-control-flow`** — the catch in `readableMessage` fabricated a return value. The throwing call now lives in a `stringifyOrNull` probe whose catch returns a sentinel `null` (the exact shape the rule's message prescribes); every rejection renders exactly as before.
- **`re-lint/no-duplicate-code` ×2** — the `rejectingWith` helper shared by the unit and acceptance suites moved to `src/orchestration/rejectingProviderTestSupport.ts`, following the repo's `*TestSupport.ts` convention and added to `tsconfig.build.json`'s exclude so it doesn't ship in dist.
- **`re-lint/no-nondeterministic-tests`** — the acceptance file's `new Date()` became a fixed `SENT_AT`, mirroring the unit file's existing pattern.

**Traceability:** `repoint-spec-anchors.mjs` auto-repointed 11 anchors; the ones it skipped or called rotten (config-hooks, tool-input-validation, and 13 in architecture) I fixed by hand against the current test lines and verified — all 20 land on their cited test titles, and `repoint-spec-anchors.mjs --check origin/main` exits 0. Formatted with prettier (all files unchanged). The spec's `| Status |` row was already Shipped from the previous round, and the CHANGELOG entry stands.

**Verification here:** I ran only the two files this round touched — `chatOrchestrator.test.ts` + `onErrorNonError.acceptance.test.ts`, 29 tests, all green, including the untouched Error-instance pins (ticket criterion 3). Lint and typecheck were not run locally per the pod's limits; CI judges the push.

**Red tests:** 0 mine, 0 regressions — the findings were on this branch's own previous round, and every touched test is green.

**Smells noticed, not acted on:** the `turn`/`turnOutcome` outcome-shaping `.then(...)` pair sits just under the duplicate threshold; `createErrorProvider` could delegate to `rejectingWith` (only an identifier differs, so the rule doesn't flag it); `saveSession`'s catch still logs-and-swallows — all pre-existing, out of scope.

**Next facet:** the last unchecked one in `.lore/dod.md` — acceptance coverage for a rejection with `undefined` (ticket criterion 2).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"all 7 CI findings on 83d834d fixed: 3 typecheck (never-narrowed hook observation), no-catch-as-control-flow (stringifyOrNull probe), no-duplicate-code (shared rejectingProviderTestSupport), no-nondeterministic-tests (fixed SENT_AT); anchors repointed, --check green","tdd_next":"acceptance coverage for a rejection with undefined (ticket criterion 2)"}}