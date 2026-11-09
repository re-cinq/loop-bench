Landed and confirmed: `origin/loop-bench/37` is at `4badec8`, working tree clean, branch up to date with its base.

## What was red and what I did

**1. `ajv` import broke three test suites at load time (test + typecheck).** `import {Ajv} from 'ajv'` resolves to a type-only binding — TS2693 in `registry.ts:100`, and at runtime ajv provides no `Ajv` named export, so every suite that transitively loads `registry.ts` died in module linking (`registry.acceptance.test.ts`, `registry.test.ts`, and `config.test.ts` — the latter only via its import chain). Fixed to `import Ajv from 'ajv'`.

**2. The red acceptance tests had never actually executed.** The link error masked them entirely — this was the real red. I implemented the validation they demand in `ToolRegistry.execute` (`src/orchestration/tools/registry.ts`): static schemas stay compiled once at `register` (stored thunk); function-valued sources resolve per call with a `WeakMap` cache keyed by schema object reference; a failed validation returns a `ToolResponse` (`Invalid input for tool "<name>": <instancePath> must be string / must have required property '<field>'`) built only from ajv's paths-and-constraints messages — never a value — and the executor is never invoked. The `Unknown tool:` throw is untouched, and `execute` carries a one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.

**3. Three eslint errors.** `preserve-caught-error` → rethrow in `compiledValidator` now attaches `{cause: error}`; `prefer-early-return` → the round-2 happy path in the acceptance test unwrapped flat behind an `if (round !== 2)` guard (both guards now have 3-statement bodies, under the rule's 4-statement threshold — I read the installed rule source to confirm the flip wouldn't re-fire); `max-member-chain` → extracted `firstChunk` so the chain is 2 hops.

**4. CHANGELOG** entry extended to describe the now-shipped execute-time validation.

**Verified locally** (pod synced to the lockfile's ajv 8.20.0 first; incidental npm lockfile churn reverted): the three suites CI named pass (`14 tests`), and the failed step itself — `npm test` — passes: **33 suites, 393 tests**. Prettier check clean on both changed TS files. Per this pod's constraints I did not run eslint, tsc, or the build — the lint fixes were written against the exact rule implementations installed here, and CI judges those steps.

Out of scope, left for the implementation loop's ledger (CI did not flag them): the README/`docs/adding-a-tool.md`/`.specify/spec.md` updates and the ticket's not-yet-written tests (extra-property passthrough, compile-once, source freshness, unknown-tool pin).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv default import unblocked typecheck+suite loading; execute() now validates against inputSchema returning a value-leak-free rejection ToolResponse; eslint cause/guard/member-chain fixed; npm test 393 green"}}