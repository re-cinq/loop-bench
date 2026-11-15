The fix is pushed to `loop-bench/37`. It's up to date with `origin/main` and has no unpushed commits. Locally I only ran the scoped tests; typecheck, lint and the full suite weren't run here, so CI still has to confirm.

**The ajv errors (typecheck and test).** I made no change for these. This pod's `node_modules` had a stale ajv 6.15 installed, which has no named `Ajv` export. The lockfile pins ajv 8.20.0, and that version does export it. After `npm ci --ignore-scripts`, which is what CI runs, `import {Ajv} from 'ajv'` works and the suites load. I can't explain why CI saw the old version, and `lore_get_ci_failures` returned "branch not found", so I couldn't read CI's install log. If typecheck still reports `TS2693`, the cause is how CI installs dependencies, not the code.

**The remaining test failures.** Once the suites loaded, 3 acceptance tests still failed because `ToolRegistry.execute` never validated input. In `src/orchestration/tools/registry.ts`:
- `execute` now checks `input` against the schema before the executor runs.
- Bad input comes back as `{result: 'Invalid input for tool "<name>": location is required; ssn must be string'}` and the executor is not called. The same messages go to a `log.warn` line, and no input values appear in either.
- A tool whose definition comes from a function is checked against the schema it returns on that call. Each compiled schema is cached, so it isn't recompiled on every call.

**The three eslint findings:**
- `registry.ts:106`: the compile error now carries `{cause: error}`.
- `registry.acceptance.test.ts:141` and `:143`: I restructured the stub provider to use an early return and took the first element with destructuring. These are lint fixes only; the assertions are unchanged.

`npm test -- src/orchestration src/config.test.ts` gave 40 passed, 0 failed, including the orchestrator retry test.

The ticket's other items are separate from this repair and still open: the docs, README and `.specify/spec.md` updates, the one-line comment on `execute`, and the remaining tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"execute never validated input (3 acceptance tests red) plus 3 eslint errors; ajv import failure was a stale ajv 6 in node_modules, lockfile pins 8.20 which exports Ajv"}}