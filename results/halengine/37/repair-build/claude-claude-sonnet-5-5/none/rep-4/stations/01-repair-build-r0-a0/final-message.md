I fixed the three red checks and pushed. I haven't run `tsc` or eslint, as instructed, so those two are untested until CI judges the push. The three tool test files (`registry.test.ts`, `registry.acceptance.test.ts`, and `src/config.test.ts`) pass locally. The branch is up to date with `origin/main` and not ahead of its upstream.

- **typecheck and test:** `registry.ts` imported `{Ajv}` by name, but `ajv` is CommonJS and has no such export. That caused both the `TS2693` error and the "does not provide an export named 'Ajv'" failures that broke every suite loading the registry, including `src/config.test.ts`. It now uses a default import that resolves the class under both Node ESM and jest. The constructor type is cast explicitly, so I'm not certain `tsc` accepts it.
- **eslint `preserve-caught-error`:** the schema-compile error now passes `{cause: error}`.
- **eslint in `registry.acceptance.test.ts`:** the round-2 branch is flattened with an early return (`if (round !== 2)`), and the three-hop member chain is replaced by destructuring the first tool result.
- **Validation in `execute`:** with the import fixed, three acceptance tests still failed because `ToolRegistry.execute` didn't validate input yet. That was the previous round's "Next" step, so I added it. It rejects invalid input before the executor runs and returns a result naming the failing field paths, the expected type or missing required property. It never echoes or logs the offending values.

I didn't run the linter, `tsc` or a full build, and I didn't change any test's intent.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv named import broke typecheck and test suites; added error cause, flattened lint violations in acceptance test, implemented input validation in ToolRegistry.execute"}}