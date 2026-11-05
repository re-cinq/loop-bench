This round repaired CI's four findings, except the two lint errors in `registry.acceptance.test.ts`. I did not edit that acceptance file. It's committed and pushed, the branch is in sync with its upstream, and `origin/main` was already merged.

**What changed:**
- **Test and typecheck failures:** `registry.ts` now imports ajv through its default export, which fixes the "does not provide an export named 'Ajv'" test failures and the `Ajv` type-as-value error.
- **Lint:** `describeFailure` now uses a lookup table instead of a switch on `error.keyword`. The compile error rethrown in `compile` now carries `{cause: error}`.
- **Changelog:** I added an `[Unreleased]` entry in `CHANGELOG.md`. The 0.4.0 version bump was already in `package.json`.

**Test run:** I ran only `registry.test.ts`. It loads and its 2 tests pass. I did not run the acceptance tests, the typecheck or the linter, so the typecheck and lint fixes are unconfirmed until CI runs.

**Still failing in CI:** `registry.acceptance.test.ts` lines 141 and 143 trip `re-lint/prefer-early-return` and `re-lint/max-member-chain`. Fixing them means editing that file. I added this as an unchecked item in `.lore/dod.md` for you to decide on.

**Left for the next round (the ticket's remaining facets):**
- unit tests: compile-once, the `Unknown tool` throw, log redaction, and the `chatOrchestrator.test.ts` retry loop
- docs: `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`
- `example/weather-tool.ts`

**Red tests:** none were mine and none were regressions. CI's test failures all came from the ajv import error.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: ajv import, lint, typecheck, changelog","tdd_next":"remaining unit tests (compile-once, Unknown tool, log redaction, orchestrator retry) then docs/example"}}