This round closed the ajv import fix and one new test, and the branch is pushed and up to date with `origin/main`. CI should still be red on two eslint errors in `src/orchestration/tools/registry.acceptance.test.ts`.

- **Import fix:** `registry.ts` now uses the named import `{Ajv}` from `ajv`. The earlier `AjvModule.default` form was behind the typecheck error and the "not a constructor" failures in the CI test log. I couldn't run the typecheck or the full suite here, so CI will confirm that.
- **New test:** "compiles a static tool schema once across ten execute calls" in `registry.test.ts`. It passed straight away because the code already behaved that way. I linked it from `specs/hal-engine-tool-input-validation/spec.md` and moved the "Unknown tool" link to `#L75`. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I fixed the line anchors by hand.
- **Tests run:** only `registry.test.ts`, run with `NODE_OPTIONS=--experimental-vm-modules npx jest`; all 4 tests pass.
- **Red tests:** 0 were mine and 0 were regressions that I know of.
- **Blocked on the owner:** the eslint errors (`prefer-early-return` and `max-member-chain`, lines 141 and 143) are in an acceptance test, which I must not edit. The owner has to decide how to handle them.
- **Still open in `.lore/dod.md`:**
  - the no-leak registry test;
  - the tool-loop test in `chatOrchestrator.test.ts`;
  - the updates to `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `example/weather-tool.ts` and the ADR.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv named-import fix and static compile-once test","tdd_next":"no-leak registry test; chatOrchestrator tool-loop test; docs/README/.specify updates; acceptance-test eslint findings need owner decision"}}