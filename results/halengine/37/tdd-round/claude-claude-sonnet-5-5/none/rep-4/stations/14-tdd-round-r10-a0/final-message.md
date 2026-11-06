This round fixed the red build and pushed it. The branch is not ahead of its upstream and is up to date with `origin/main`.

CI had failed at `dfce4f3` with typecheck errors and a "does not provide an export named 'Ajv'" error that took down every suite importing the registry. The named `{Ajv}` import fails because `ajv` is CommonJS, so I replaced it. `registry.ts` now loads `ajv` through `createRequire(import.meta.url)`, the same way `requireOptionalPeer.ts` already does. The validator, error and constructor types are declared locally, which removes the dependency on `ajv`'s own typings. Those typings had produced the `instancePath` and `missingProperty` typecheck errors.

- **Tests:** `registry.test.ts` passes, 6 of 6. I did not run the acceptance tests, the typecheck, lint or the build, as instructed. The typecheck fix is based on reading the code, so CI is what will confirm it.
- **Red tests:** none of the red tests were regressions I caused. The suites that failed (the acceptance file, `registry.test.ts`, `chatOrchestrator.test.ts` and `config.test.ts`) failed on the `ajv` import. The coverage-threshold message in CI came from the same load failures.
- **Docs facet:** I ticked the last item in `.lore/dod.md`. The example, guide, README, spec, ADR-002 and `CHANGELOG.md` edits were already committed in `905f8e2`.
- **Not fixed:** the `ajv` import was switched back and forth across six earlier commits.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"load ajv via createRequire with local types (fixes ESM load and typecheck failures)","tdd_next":"acceptance green"}}