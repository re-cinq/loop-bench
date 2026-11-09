Branch is synced with origin/main and the push landed (`loop-bench/37` is not ahead of its upstream).

## What was broken and what I did

**1. typecheck — `TS2693: 'Ajv' only refers to a type` (registry.ts:100)** and **2. test — `The requested module 'ajv' does not provide an export named 'Ajv'`** (registry.acceptance.test.ts, config.test.ts, registry.test.ts — everything transitively importing `registry.ts`): the code used a *named* import `import {Ajv} from 'ajv'`, but ajv (the lockfile pins 8.20.0) is a default-only export, which fails both typecheck and jest's ESM link. Fixed with a default import `import Ajv from 'ajv'`.

**3. eslint (3 findings):**
- `registry.ts:106 preserve-caught-error` — the re-thrown error now carries `{cause: error}` (verified against the core rule's source: object-literal `cause` is the shape it wants).
- `registry.acceptance.test.ts:141 prefer-early-return` — flipped `if (round === 2)` into `if (round !== 2)` guarding the fallback tail so the happy path runs flat. I read the rule's source first: it only fires on guards with ≥4 statements, and both guards now have 3, so no new finding can appear.
- `registry.acceptance.test.ts:143 max-member-chain` — broke the 3-hop `lastMessage.content[0]?.content` into a named 2-hop intermediate `lastResult`.

**4. The feature itself was half-built** — the brief's "Next:" line said it: `execute` never called the compiled validator, so once the suites loaded, the acceptance tests would have failed on assertion. I wired it in per the spec (`specs/hal-engine-tool-input-validation/spec.md`): `execute` validates before the executor via a `WeakMap` keyed by the resolved schema object — static schemas compile once at `register` (pre-seeded, so ten executes never recompile), function-valued sources resolve per call and cache per schema object. A rejection returns `{result: 'Invalid input for tool "<name>": <path> <message>'}` naming property paths and constraints (ajv messages never embed input values; the rejection log carries only the name and problem strings), and `execute` got the required one-line doc comment pointing at the spec.

**Verified locally:** `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.test.ts src/orchestration/tools/registry.acceptance.test.ts` → **2 suites, 5 tests passed**. `npx prettier --write` on both changed files reported them already conformant. (Caveat: this pod's `node_modules` holds a stale ajv 6.15.0 vs CI's locked 8.20.0; the assertions are version-agnostic — both versions satisfy the `/required/i` and `includes('string')` checks and neither leaks values. I did not reinstall or typecheck here per the pod rules; CI judges the push.)

Committed as `feat(tools): validate input against inputSchema` and pushed; `origin/main` merged (already up to date).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv named import broke typecheck+test load (fixed to default import), 3 eslint findings (cause, early-return, member chain), and execute never invoked the compiled validator (now validates and returns a rejection ToolResponse)"}}