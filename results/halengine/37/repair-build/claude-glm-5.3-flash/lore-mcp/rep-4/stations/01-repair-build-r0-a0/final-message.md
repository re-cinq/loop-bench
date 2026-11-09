Branch is synced with `origin/loop-bench/37` (no ahead/behind), and `origin/main` needed no merge — it's already an ancestor. Done.

## What was red and what I fixed

**1. typecheck — `registry.ts(100,17): TS2693 'Ajv' only refers to a type`**
The named import `{Ajv}` from 'ajv'. Fixed to `import Ajv from 'ajv'` (`registry.ts:1`) — ajv's CJS build is `module.exports = Ajv` with no statically detectable named export, so this one character also fixes every **test** suite failure (`The requested module 'ajv' does not provide an export named 'Ajv'`), which loaded through the same import in `config.test.ts` and the registry suites transitively.

**2. eslint `preserve-caught-error` — `registry.ts:106`**
Attached `{cause: error}` to the rethrown `Invalid inputSchema for tool …` error (`registry.ts:124`).

**3. eslint `prefer-early-return` + `max-member-chain` — `registry.acceptance.test.ts:141-143`**
Flipped the `if (round === 2)` happy-path wrap into `if (round !== 2)` guarding the tail (both guard blocks stay at 3 statements, under the rule's 4-statement flip threshold) and split the 3-hop `lastMessage.content[0]?.content` into `firstContent` + `firstContent?.content`.

**4. The failure CI never got to see:** the test suites failed at *load*, so the acceptance tests had never run — and behind them, `execute` had **no validation at all**. Implemented it per the spec (`specs/hal-engine-tool-input-validation/spec.md`): validators compiled at `register` (broken schema fails at startup) and cached by schema-object identity in a `WeakMap`, so function-valued sources validate against the schema current at each call; `execute` validates before invoking the executor and returns a rejection `ToolResponse` naming property paths and constraints without echoing any input value; the `Unknown tool` throw is unchanged; `execute` carries the one-line doc comment pointing at the spec.

**Verification:** all registry-adjacent suites pass — 36/36 (registry, acceptance, config, chatOrchestrator) and 66/66 (orchestratorHelpers, createApp, messageHandler, chats) under ajv 8.20.0. One transient failure in a first combined batch reproduced as green both per-suite and in the re-run batch — worker contention, unrelated to the diff. Prettier reports both changed files conform. Per pod policy I did not run eslint or `tsc` here; the lint fixes were derived from the rule sources (`prefer-early-return`'s flip threshold, `max-member-chain`'s hop count) and CI judges them on push.

Environment note: this pod's `node_modules` had ajv **6.15.0** (eslint's hoisted transitive dep) instead of the lockfile's **8.20.0**, so I installed the locked ajv 8.20.0 (+ `fast-uri`, `require-from-string`) into the pod's `node_modules` — outside the repo, no `package.json`/lockfile change — to make the local run faithful to CI's `npm ci`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv named-import broke typecheck and all test-suite loading; added missing cause, unwrapped happy path, split 3-hop chain; implemented the execute-time inputSchema validation the acceptance tests needed behind the load failure"}}