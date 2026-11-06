I pushed a fix as `loop-bench/37`. It's up to date with `origin/main` and has nothing left unpushed. The four affected test suites now pass locally (40 tests), but the typecheck and eslint findings haven't been confirmed yet. The pod's rules forbid running those here, so CI will judge them on this push.

**Typecheck and test (`'Ajv' only refers to a type` / `does not provide an export named 'Ajv'`):** the code was right for the version the branch asks for. `package.json` and the lockfile both pin `ajv@^8.20.0`. But the installed `node_modules` dated from Oct 19, before ajv was added, and held the older `ajv@6.15.0` that eslint pulls in. That old version produces exactly those two errors. Re-syncing with `npm ci --ignore-scripts` installed 8.20.0 and the import resolved without any code change. A clean CI install should get 8.20.0 as well. If CI reuses an old `node_modules` the way this pod did, this error will come back even though the code is right.

**Test suites that were still red once the import loaded:** `ToolRegistry.execute` didn't validate input yet, so I added that in `src/orchestration/tools/registry.ts`:
- Input is checked against the tool's schema before the executor runs.
- A failure comes back as `{result: 'Invalid input for tool "<name>": …'}`. It names the property path and the rule that failed (e.g. `location is required`, `ssn must be string`) and never the value. The log line records only those same messages.
- Tools with a fixed schema reuse the validator compiled at `register`. Tools whose definition comes from a function compile the schema each call, cached per schema object.
- `Unknown tool: <name>` still throws, unchanged.
- `execute` has a one-line doc comment pointing at the spec.

**Eslint findings:**
- `registry.ts:106` (no `cause` attached): the register-time compile error now passes `{cause: error}`.
- `registry.acceptance.test.ts:141` (`prefer-early-return`): the stub provider now returns early for round 3 and runs round 2 without the `if`. The test asserts exactly what it did before, and the spec's line references to the tests are unchanged.
- `registry.acceptance.test.ts:143` (`max-member-chain`): the 3-hop chain is split by destructuring `lastMessage.content` first.

Tests run: `jest src/orchestration src/config.test.ts`, which passed (5 suites, 40 tests). The pod's hook blocked the full `npm test`. Prettier made no changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"stale node_modules had ajv@6 instead of the locked 8.20 (Ajv import); execute did not validate input yet; 3 eslint findings (missing error cause, nested if, 3-hop member chain)"}}