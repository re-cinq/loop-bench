I fixed the three typecheck errors in `registry.ts` and pushed. The ticket is not done, and the other CI failures are still open.

- **Cause:** CI's `tsc` saw ajv's old v6 type shape (no `.default`, no `instancePath`), although the lockfile and local `node_modules` have 8.20.0. I couldn't reproduce that without running `tsc`, so I made the import independent of ajv's type shape.
- **Change:** `registry.ts` now loads ajv with `createRequire`. It uses small local `ErrorObject`, `ValidateFunction` and `AjvConstructor` types and takes the class from `.default` or `module.exports`.
- **Tests:** `registry.test.ts` runs under jest, not vitest, and its 5 tests pass. I did not run `tsc`, so the typecheck fix is unconfirmed until CI runs.
- **Delivery:** formatted, committed and pushed. `origin/main` merged with nothing to merge, and the branch is level with its upstream.

I added no new test this round; it was a repair of the CI findings.

Still open:
- **eslint:** `registry.acceptance.test.ts` lines 141 and 143 break `prefer-early-return` and `max-member-chain`. I can't edit an acceptance test, so this needs an owner decision.
- **CI test failure:** the verdict was truncated, so I can't say whether the import was its only cause. Treating the import as the cause is a guess.
- **Remaining work:**
  - the `chatOrchestrator.test.ts` tool-loop test;
  - the docs, README and `.specify` updates;
  - the CHANGELOG entry and the `example/weather-tool.ts` update.

Red tests this round: none of mine. I found no regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv loaded via createRequire with local types (typecheck fix)","tdd_next":"chatOrchestrator tool-loop test; docs/README/.specify/CHANGELOG updates; acceptance-test eslint findings need owner decision"}}