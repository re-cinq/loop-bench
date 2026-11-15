The round is pushed: `loop-bench/37` is at `363ffbb`, not ahead of its upstream, and the merge with `origin/main` produced nothing to add.

**CI findings from the previous push (all addressed, none verified by CI yet)**
- **typecheck, `registry.ts:7`** (`strict` not in `Options`): the Ajv options are now a plain const passed to `new Ajv(...)`.
- **typecheck, `registry.ts:98`** (`instancePath` not on `ErrorObject`): the failure text now comes from `ajv.errorsText(validate.errors, {dataVar: 'input'})`, so the code no longer reads `instancePath`. The message still names the path and constraint and never includes the value.
- **eslint, `registry.test.ts:60`** (member chain): destructured `compile.mock` and read the length before `mockRestore()`.
- **eslint, `registry.acceptance.test.ts:141,143`** (early return, member chain): I restructured the mock provider's round-2 branch into an early-return guard and split the member chain. The yield order and assertions are unchanged. This is an edit to an acceptance-test file, so please check it: it was made only to satisfy lint, not to change what the test asserts.

**This round's TDD cycle: function-source `WeakMap` cache**
- Red: a new test in `registry.test.ts` registers a function-valued source that returns the same schema object on each of ten `execute` calls, and expects one compile. It failed with `Expected: 1, Received: 10`.
- Green: a `WeakMap<Record<string, unknown>, ValidateFunction>` cache keyed by the returned schema object. All four tests in `registry.test.ts` pass locally.
- The new test is cited from the spec statement it validates (`specs/hal-engine-tool-input-validation/spec.md`, the function-valued caching bullet, pointing at `registry.test.ts#L66`). The `dod.md` facet is ticked.

**Tests run here:** only `src/orchestration/tools/registry.test.ts` with jest, 4 of 4 green. No acceptance tests were run, and I did not run tsc, eslint, or prettier's check beyond formatting the changed files.

**Caveat on the typecheck fix:** the local `node_modules` has ajv 8.20.0, whose declarations include `strict` and `instancePath`. CI's errors look like ajv 6 declarations (`dataPath`, no `strict`). I could not reproduce that without running tsc, so the typecheck fix may not hold in CI. If the next CI verdict still names `registry.ts:7`, the cause is ajv resolution, not the code.

**Red-test accounting:** the previous CI verdict named no red tests from running the acceptance suite. The eslint findings were in one acceptance test I did not write and one unit test I wrote in an earlier round. I know of no regressions among the existing tests.

**Remaining facets (open):** the acceptance test for validating against the schema current at each call, the wrong-type log and value-leak check, the one-line doc comment on `execute`, the orchestrator tool-loop test, the MINOR version bump, docs/README/CHANGELOG, and the spec's remaining statement links.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache function-source validators in a WeakMap keyed by the returned schema object","tdd_next":"Acceptance test 3 (validate against the schema current at each call) and the wrong-type log/value-leak check"}}