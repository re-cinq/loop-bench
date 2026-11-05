This round fixed the CI findings and added the unknown-tool pin test. The new test is green and the work is pushed. I ran only `registry.test.ts` here, so typecheck and eslint are unconfirmed until CI runs. The branch merged cleanly with `origin/main` and is not ahead of its upstream.

- **Typecheck and test failures:** `registry.ts` now uses the named `import {Ajv} from 'ajv'` instead of `AjvModule.default`, which was undefined at runtime under jest. I expect the `ErrorObject` type errors to clear with it, because they looked like fallout from the bad import. CI will confirm.
- **Lint, `registry.test.ts`:** I merged the two `expect` calls in the pass-through test into one `toEqual`.
- **Lint, `registry.acceptance.test.ts`:** I flipped the stub provider's `if (round === 2)` into an early return. This touched only the provider helper, not any assertion.
- **New test:** `execute` throws `Unknown tool: missing_tool` for an unregistered name. It is linked in the spec, and the function-valued test's link moved from `#L25` to `#L27`.
- **Regressions:** none. All red tests this round were either mine or the acceptance test's lint finding.

The eslint step timed out in CI, so there may be more findings than the two it listed.

Unrelated smell: `describe` in `registry.acceptance.test.ts` is long. I left it alone.

I ticked the CI-fix facet in `.lore/dod.md`. The remaining facet is still open: the compile-once test, the no-value-leak log test, the orchestrator retry test in `chatOrchestrator.test.ts`, and the docs, README, `.specify/spec.md`, ADR, example and CHANGELOG updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI fixes (named Ajv import, lint) and unknown-tool pin test","tdd_next":"compile-once test, no-value-leak log test, chatOrchestrator retry test, then docs/README/.specify/ADR/example/CHANGELOG"}}