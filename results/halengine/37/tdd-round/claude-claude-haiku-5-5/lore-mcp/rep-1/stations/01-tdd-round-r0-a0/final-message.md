Round delivered and pushed: `loop-bench/37` is at `87685ca`, in sync with its upstream. Nothing was run in CI or lint, and I did not run the acceptance tests.

**What this round did**
- **Facet 1, closed:** added `ajv@^8.20.0` to `dependencies` and bumped the package to 0.4.0. I used `npm install --ignore-scripts` so the `prepare` build did not run.
- **Facet 2, static half:** the test `throws at register time naming the tool when a static inputSchema cannot be compiled` was written first. It failed with "Received function did not throw". The green change is in `registry.ts`: an `Ajv` instance with `strict: false` and `validateFormats: false`, and `register` compiles the schema and rethrows with `Invalid inputSchema for tool "<name>": …`. The test then passed. Refactor had nothing to tidy.
- Prettier ran on both TS files, and `.lore/dod.md` was updated. Facet 1 is ticked. Facet 2 stays unchecked, and a new unchecked facet records what remains.

**Test counts**
- Tests I ran here: 1 (the new `registry.test.ts`), red then green. The ran-here tests are not CI's verdict.
- Red tests I wrote that CI will see: none known. The acceptance file is not yet green, as expected mid-ticket.
- Regressions: none found. The graph reports no tests covering `registry.ts`, and there was no round brief. `lore_get_ci_failures` returned 404 "branch not found", so CI's verdict on this branch is unknown.

**Known gaps, not fixed**
- `register` also compiles function-valued sources' resolved schema at registration. The ticket wants those compiled per call, cached by a `WeakMap`. That is the remaining facet 2 work and the next round's job.
- The shared `Ajv` instance may throw if two tools share a schema `$id` (ajv rejects duplicate ids). Nothing in the tests exercises this yet.
- Not touched, per the rules: the input-validation step in `execute`, the orchestrator test, the spec/docs updates, and the traceability links.

`tdd_done` is the static half of facet 2 (plus facet 1). `tdd_next` is the function-valued per-call compile with the `WeakMap` cache.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"facet 1 (ajv dependency + MINOR bump); facet 2 static half (compile at register, throw naming tool)","tdd_next":"facet 2 remainder: per-call compile for function-valued schemas with WeakMap cache"}}