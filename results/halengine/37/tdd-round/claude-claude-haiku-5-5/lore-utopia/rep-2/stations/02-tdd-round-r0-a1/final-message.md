Facet 2 is closed and pushed to `loop-bench/37` (commit `2fe5363`). The branch is in sync with its upstream, and `origin/main` was already merged in.

- **Red:** I added `throws from register naming the tool when a static inputSchema is uncompilable` to `src/orchestration/tools/registry.test.ts`. It failed because `register` accepted the bad schema silently.
- **Green:** `register` now compiles static schemas via the existing `validatorFor`, and `validatorFor` rethrows compile errors as `Invalid inputSchema for tool <name>: …`. Function-valued sources still compile per call, cached by WeakMap. Both tests in that file pass.
- **Traceability:** the register-time statement in `specs/hal-engine-tool-input-validation/spec.md` now also links to the new unit test.
- **Dod:** facet 2 is ticked in `.lore/dod.md`.

Facets 3 and 4 remain unchecked. The code for facet 3 (validate in `execute`) is already on HEAD from the previous round, but the facet is still unticked and I did not change it this round. Facet 4 (the remaining tests, docs, and CHANGELOG) is still open.

Other notes:
- I ran only my own unit file with Jest, since this repo uses Jest rather than Vitest. I did not run the acceptance tests, and no `round-brief.md` existed.
- I did not run prettier beyond the formatter check (it reported both files unchanged), lint, or the typechecker.
- Red tests from this round: 1, written by me. Regressions: 0 known, since no CI verdict was available to me in this container.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at ToolRegistry.register time (throws naming the tool)","tdd_next":"Validate input in ToolRegistry.execute before the executor runs, with one-line doc comment and remaining spec links"}}