I fixed what CI flagged on the last push and closed one facet: validators for function-valued tool definitions are now cached by schema object. The commit is pushed, `origin/main` was already merged in, and the branch is level with its upstream.

**CI findings fixed** (all in `src/orchestration/tools/registry.ts`):
- **Typecheck error and "Ajv is not a constructor":** the import is now `import {Ajv} from 'ajv'`. That one wrong import caused the typecheck error and the test failures in `registry.test.ts` and `config.test.ts`. The CI log was cut off, so I couldn't see the full list of failing tests; I'm assuming they all share this cause. All 3 visible red tests were from this ticket's own last commit, and none were regressions in older tests.
- **eslint `preserve-caught-error`:** the error thrown at register time now passes the original error along as `{cause: error}`.

I didn't run eslint or the typechecker here, so the next push's CI run will confirm both fixes.

**This round's facet**, with the change in `registry.ts` and the tests in `registry.test.ts`:
- **Red:** a new test checks that a function-valued definition returning the same schema object compiles it only once over ten calls. It failed, because every call compiled the schema again.
- **Green:** `execute` now looks up a cached validator for the function-valued schema (a `WeakMap` keyed by the schema object) and compiles only when the schema is new.
- **Also added:** a test that, after the function starts returning a different schema, the next call is checked against the new one and not a stale cached one. It passed before the change, so it guards the behaviour rather than drives it.

All 4 tests in `registry.test.ts` pass. I added links to both new tests on the matching statement in `specs/hal-engine-tool-input-validation/spec.md`. This repo has no `reanchor.mjs`, so I checked the line numbers by hand (#L39 and #L62). The existing links in that spec all point at lines that didn't move. In `.lore/dod.md` I ticked this facet and added one: a test that a static tool's schema is compiled once across ten `execute` calls.

**Left for later rounds** (no unrelated problems came up): the version bump to 0.4.0 is still open, the `execute` doc comment hasn't been written, and the docs and README updates haven't been done.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object (WeakMap); fixed CI ajv import and preserve-caught-error","tdd_next":"Reject a wrong-typed field naming path and expected type without leaking the value (acceptance test 2), then static compile-once-across-ten-calls test"}}