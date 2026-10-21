Round complete. The branch is pushed and in sync with its upstream, and `origin/main` merges clean.

## What this round did

**1. Fixed CI's eslint finding (the round brief's only failure).** `src/orchestration/onErrorNonError.acceptance.test.ts:12` used `new Date().toISOString()`; it now uses a fixed `SENT_AT` constant — the idiom `chatOrchestrator.test.ts` already uses, same one-line comment. No assertion changed; only the fixture's timestamp source.

**2. Closed the last open facet — pin the `undefined` rejection (ticket criterion 2's remainder):**
- Acceptance file: new test `calls onError with an Error carrying a readable message when the stream rejects with undefined` (mirrors how the string case is pinned at both levels). The pod's guard refuses any run naming an acceptance file, so this one is CI's to run.
- Unit suite: `wraps an undefined rejection so onError receives an Error carrying a readable message` in `src/orchestration/chatOrchestrator.test.ts:340`, which I could and did run — **28 passed, 0 failed**. It pins that `onError` receives an `Error` with a non-empty message, the caller still receives `undefined`, and nothing else changes shape.

**3. Traceability.** The `specs/hal-engine-config-hooks/spec.md` statement now names `undefined` explicitly and cites the new unit test; the inserted test shifted 17 existing `#Lnn` anchors, all repointed with the repo's `check-spec-anchor-names.mjs --fix` (0 findings; `check-spec-links` reports 0 misplaced).

**4. `.lore/dod.md`** — the `undefined` facet ticked, a third acceptance-bar entry appended. All four facets are now closed.

Not run here, per pod rules: eslint, typecheck, build, and the acceptance file. Score: red tests of mine 0 (the pin passed first run — it characterises the wrapping the previous round's fix already shipped); regressions 0. Unrelated smell noticed, not acted on: the throw-provider stub is duplicated between the acceptance file's `rejectingWith` and the unit file's `createErrorProvider`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pin the undefined-rejection case (acceptance file + unit suite), and fix CI's eslint finding on the acceptance file","tdd_next":"acceptance green"}}