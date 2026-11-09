Round complete — pushed as `06681a2`, merged origin/main (already up to date), working tree clean, branch not ahead.

**What this round did**

- **CI findings owed:** CI on `334091c` failed `eslint` and `spec-names`. Both traced to one defect: 33 stale `#Lnn` spec anchors after the test-helper refactor moved test declarations. Repaired with the repo's own tool (`node scripts/check-spec-anchor-names.mjs --fix`), then verified all four markdown gates green: `spec:names` 809 citations all naming their tests; `check:spec-links` misplaced 0 (1937 statements); `check:spec-status` 0 findings across 33 docs; `repoint-spec-anchors --check origin/main` stale 0, exit 0.
- **The facet the dod owed:** wrote `### 4.3 list_sessions` and `### 5.9 session_list` into `specs/hal-engine-websocket-protocol/spec.md` — frame examples, field tables, the authorisation rule (user id from the connection, never the frame; a client `userId` is dropped), the INVALID_MESSAGE constraints, ISO-8601 serialisation, empty-list-when-the-store-has-no-`listFor`, `SERVER_ERROR` + `ws` log on rejection, no `stream_end`, and the metadata-only retention note pointing at re-cinq/HALEngine#41. All 10 new statements carry `([validated by: …])` citations; the spec's Status stays `In Progress` (it still holds uncited client-side requirements).
- **CHANGELOG:** fixed two stale bullets — "the engine does not answer it yet" and "nothing in the engine calls it yet" both predate the handler — and documented the shipped `session_list` answer for installers.
- **dod.md:** ticked the documentation facet and the CHANGELOG item; appended one newly discovered unchecked facet (the off-lock ordering statement has no validating test yet).
- **Ran no tests this round** — the round was documentation; only the markdown gate scripts executed. Formatter not run: the prettier script covers `{src,scripts,smoke}/**/*.ts` only, and nothing TypeScript changed.

**Red tests:** 0 mine, 0 regressions. Nothing was fixed by editing a test; no acceptance test was touched.

**Unresolved:** the round brief's `test` check findings were truncated out (only eslint lines survived). Forensics on the CI artifacts could not name it: coverage floors all pass on ci-3; ci-2 and ci-3 lcov show identical DA/FNDA/BRDA execution (validation.ts hit counts reconstruct exactly: 30 list frames = 16+2+12); every assertion in the acceptance suite reads green; no test reads `.lore/`. The fix attempt is making eslint+spec-names green — the next brief should name it.

**Unrelated smells noticed, not fixed:** `limit: null` validation behaviour shifted in the lookup-table refactor (null previously fell through differently); the acceptance suite's `delegatingTo` deliberately omits `listFor` to exercise the optional-capability path — intentional, but easy to misread as a fixture bug.

Getting-started docs (via `example/full-config.ts` + `npm run docs:fix`) and the MINOR bump remain owed — next round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document list_sessions and session_list in the protocol spec, with cited statements, and repair the 33 stale spec anchors CI named","tdd_next":"getting-started docs via example/full-config.ts + npm run docs:fix, MINOR bump, cite the off-lock ordering statement — and the 'test' check finding the next brief should name"}}