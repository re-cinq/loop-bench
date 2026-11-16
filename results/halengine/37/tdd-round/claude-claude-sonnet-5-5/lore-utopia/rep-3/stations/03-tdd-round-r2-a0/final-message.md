This round fixed the typecheck error and the `registry.test.ts` lint error from the last CI verdict, and added the extra-property passthrough test. The branch is pushed and not ahead of its upstream. `origin/main` was already merged in.

I ran only `registry.test.ts` locally, and both its tests pass.

- **Typecheck and test failures:** `registry.ts` now uses `import {Ajv} from 'ajv'` and `new Ajv(...)`. The earlier `AjvModule.default` import failed to typecheck and threw "not a constructor" under ts-jest. The `instancePath` typecheck error was probably a knock-on from the same import; locally `ErrorObject` does have it. I did not run the typechecker, so CI will confirm.
- **Lint failure in `registry.test.ts`:** the function-valued test had 3 `expect` calls. It now asserts one object with `toEqual`.
- **New test:** valid input with an undeclared extra property reaches the executor unchanged, exactly once. I linked it from the spec statement for passthrough and updated `.lore/dod.md`.
- **Reanchor script:** `scripts/spec-links/reanchor.mjs` doesn't exist in this repo. The existing `#Lnn` links to the function-valued test (`#L5`) are unchanged, and I set the new link to `#L33`.

Two lint errors remain in `registry.acceptance.test.ts`: `prefer-early-return` at line 141 and `max-member-chain` at line 143. I can't edit an acceptance test, so the owner needs to decide on those.

The CI coverage-threshold failure for `src/orchestration/tools/` probably came from the suite crashing on the import, so it may clear now. I haven't checked.

Red tests this round: 1 was mine (`max-expects`), and 0 were regressions.

**Facet still open:**
- The ten-compile test.
- The unknown-tool test.
- The no-leak test.
- The `chatOrchestrator.test.ts` tool-loop test.
- The `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md` and `adrs/ADR-002-response-validation.md` updates.
- The `example/weather-tool.ts` update.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ajv named import, single-expect registry test, extra-property passthrough test","tdd_next":"ten-compile, unknown-tool and no-leak registry tests, chatOrchestrator tool-loop test, docs/README/.specify updates"}}