This round fixed the typecheck, eslint and changelog failures from CI's last verdict, except two eslint errors in the acceptance test. The fix is committed and pushed, and `git status` shows the branch level with its upstream. No tests ran here. This was a repair round with no new test, and the pod's hook blocks running the acceptance file.

- **Typecheck:** `registry.ts` now declares its own minimal `ValidateFunction` and `AjvConstructor` types instead of using ajv's. The old code failed to compile because the typings CI resolves look like ajv 6's, while `package-lock.json` pins 8.20. I couldn't confirm which version CI installs. The code now reads either `instancePath` (ajv 8) or `dataPath` (ajv 6).
- **Eslint:** the `preserve-caught-error` finding at `registry.ts:62` is fixed by attaching `{cause: error}` to the thrown error.
- **Changelog:** I added an entry under `## [Unreleased]` in `CHANGELOG.md`.
- **Not fixed:** two eslint errors remain in `registry.acceptance.test.ts` at lines 141 and 143 (`prefer-early-return`, `max-member-chain`). I left them because that is an acceptance file I may not edit, so the eslint check will stay red until someone handles it.
- **Merge:** `origin/main` was already merged, so there was nothing to merge.
- **Red tests:** none of the CI findings were tests; all were typecheck, lint and changelog findings, so 0 red tests of mine and 0 regressions.
- **Unrelated smell:** the local `node_modules` holds ajv 6.15 although the lockfile pins 8.20, which is probably why the typings don't match.

The remaining facet is still open in `.lore/dod.md`: the unit tests in `registry.test.ts` and `chatOrchestrator.test.ts`, the spec links, and the docs, README, `.specify/spec.md`, ADR and example updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: ajv typing, error cause, CHANGELOG entry","tdd_next":"registry.test.ts and chatOrchestrator.test.ts tests with spec links; docs/README/.specify/ADR/example updates"}}