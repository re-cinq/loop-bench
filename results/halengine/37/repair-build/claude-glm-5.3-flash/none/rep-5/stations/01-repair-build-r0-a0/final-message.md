Everything landed. Here's the round in full:

## What CI named, and what I fixed

**typecheck — `registry.ts(100,17) TS2693: 'Ajv' only refers to a type`** and **test — `The requested module 'ajv' does not provide an export named 'Ajv'`** (3 suites) shared one root cause: `import {Ajv} from 'ajv'` against ajv 8, which is CJS with a default export. Fixed with `import Ajv from 'ajv'` — verified the default import resolves both under Node ESM and through jest's ESM loader, against the exact version CI installs (8.20.0).

**eslint — 3 findings, all fixed as the rules prescribe** (I read the plugin's rule sources, not guesses):
- `prefer-early-return` at `registry.acceptance.test.ts:141` → flipped the round-2 `if` into an `if (round !== 2)` guard, so the happy path runs flat.
- `max-member-chain` at `:143` → split `lastMessage.content[0]?.content` (3 hops) into `const firstPart = lastMessage.content[0]` + `firstPart?.content` (2 max).
- `preserve-caught-error` at `registry.ts:106` → the wrapped compile error now carries `{cause: error}`.

**test — what the import fix unmasked**: the acceptance suite then failed on assertions, because `execute` still didn't validate — that was this round's remaining work per the previous round's dod. So I implemented it: `execute` validates input against the resolved schema before the executor runs, returns `{result: 'Invalid tool input: …'}` naming property paths and constraints (ajv messages never carry values), logs only path/constraint facts, keeps `Unknown tool` throwing, reuses the register-time validator for static tools, and compiles function-valued schemas per call cached by schema object in a `WeakMap`. Plus the one-line doc comment pointing at the spec.

## Ticket criteria beyond the red build

Added the five tests the ticket names to `registry.test.ts` (required-location, extra-property passthrough under `toEqual` exactly once, compiled-once proven by swapping the schema after register across ten calls, function-valued schema currency, Unknown-tool pin), cited all eight spec statements, and flipped the spec's Status to `Shipped` — confirmed with the plugin's own coverage function (8/8 linked, `statusMismatch: null`). Updated README, `.specify/spec.md`, `docs/adding-a-tool.md` (no more cast-defensively guidance), `example/weather-tool.ts` (defensive `|| 'Unknown'` gone, doc-block re-synced via `docs:fix`), ADR-002, and CHANGELOG with the migration note. One deviation to flag: the ticket's loop-test criterion says `chatOrchestrator.test.ts`, but the previous round wrote that test in `registry.acceptance.test.ts` where it passes and is spec-cited — I kept it rather than cloning it.

## What I verified locally (and how)

`node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand src` → **20 suites, 206 tests pass**; all spec/doc gate scripts pass (`spec:names`, `check:spec-links`, `check:spec-status`, `docs:check`, `check:regions`); prettier clean on all three changed `.ts` files; `check-changelog.sh` passes. One trap found on the way: the pod's `node_modules` held a stale ajv 6 (ajv 6 errors use `dataPath`, not `instancePath`) that the lockfile doesn't even record — I swapped in the lockfile-pinned 8.20.0 (+ its `fast-uri`/`require-from-string` deps) from a temp dir so local runs match CI; node_modules isn't tracked, so nothing leaked into the commit. Per pod rules I did not run eslint, tsc, or a build here — CI judges those. Committed as `60a9285`, pushed, and `origin/main` is already an ancestor of the branch, so no merge was needed; `git status` confirms the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv default-import fix (typecheck + 3 suites' ESM link errors), 3 lint findings, and the missing ToolRegistry.execute input validation with tests, spec citations and docs"}}