This round fixed the ajv import and added the changelog entry and one new test. The ticket is not done, and CI's lint failures in the acceptance test are still open. The fix is pushed, `git status` shows the branch is level with its upstream, and `origin/main` was already merged.

**Fixed from CI's report**
- **Import:** `registry.ts` now uses the default import of `ajv` (`AjvModule.default`). The named `Ajv` export doesn't exist at runtime, and that caused the "does not provide an export named 'Ajv'" failure in the test suites. I expect it to also clear the four typecheck errors, which came from the same import, but I did not run the typechecker.
- **Validator cache:** I rewrote `compile` so its return type can no longer be `undefined`.
- **Lint:** I added `{cause: error}` to the register-time error, which clears the `preserve-caught-error` finding in `registry.ts`.
- **Changelog:** I added an `[Unreleased]` entry to `CHANGELOG.md`.
- **Test:** `src/orchestration/tools/registry.test.ts` is new and has one test, "validates a function-valued definition against the schema returned for that call". `specs/hal-engine-tool-input-validation/spec.md` already links it at line 5. It passes locally. I ran only that file, with `--experimental-vm-modules`.

**Not fixed: lint errors in the acceptance test**
- **The findings:** `registry.acceptance.test.ts` lines 141 and 143 fail `prefer-early-return` and `max-member-chain`. I left them because you said never to edit an acceptance test.
- **Decision for you:** that test needs a lint-only edit, or a lint exemption, from whoever owns it.

**Red tests:** I found no regressions. The red tests I saw were all this ticket's own: the suite-load failures from the import bug, plus the acceptance test's lint findings, which are still open.

**Still to do** (`.lore/dod.md` is updated; the unit-tests facet is only partly done and stays unticked):
- **Missing tests:** extra-property pass-through, ten-call compile count, `Unknown tool` throw, no-value-leak, and the `chatOrchestrator.test.ts` tool-loop test.
- **Docs:** `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md` and `example/weather-tool.ts`.
- **Spec links:** the remaining unlinked statements in the spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ajv import/typecheck/cause lint, changelog, function-valued schema test","tdd_next":"remaining registry.test.ts cases, chatOrchestrator tool-loop test, docs/README/.specify updates, spec links; acceptance-test lint errors need owner decision"}}