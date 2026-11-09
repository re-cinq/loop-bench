Branch is pushed and level with its upstream; `origin/main` is already an ancestor of HEAD, so no merge or conflict resolution was needed.

## What was broken and what I fixed

**The three red checks:**

1. **`test` — all suites failing to link** (`SyntaxError: The requested module 'ajv' does not provide an export named 'Ajv'`): every suite that transitively imports `registry.ts` died at ESM linking. Fixed by importing ajv's **default export** (`import Ajv from 'ajv'`) — the canonical form for the locked ajv 8.20.0, whose own `dist/ajv.d.ts` declares `export default Ajv`. This also fixes the **`typecheck`** TS2693 on `new Ajv(...)` at `registry.ts:100`.
2. **`eslint registry.acceptance.test.ts:141` (`prefer-early-return`)** — flipped the wrapped round-2 happy path into `if (round !== 2)` guarding the two dangling yields.
3. **`eslint registry.acceptance.test.ts:143` (`max-member-chain`)** — split `lastMessage.content[0]?.content` (3 hops) into `const [firstPart] = lastMessage.content` + `firstPart?.content`.
4. **`eslint registry.ts:106` (`preserve-caught-error`)** — the wrapped schema error now carries `{cause: error}`.

**What the tests needed to actually pass:** `ToolRegistry.execute` had no validation yet, so the four acceptance tests would fail assertions once loadable. I implemented the ticket's core work — validate before the executor, return a rejection `ToolResponse` naming paths/constraints without property values, static schemas compiled once at `register`, function sources resolved per call with a `WeakMap` keyed by the schema object.

**Remaining ticket criteria:** the spec's four uncited statements got their tests (extra-property passthrough, `Unknown tool` pin, compiled-once across ten calls, per-call function schema — including the WeakMap-cache behavior); spec status flipped to `Shipped` (verified 8/8 statements linked with the repo's own parser); README, `.specify/spec.md` and `docs/adding-a-tool.md` now state the true contract; `example/weather-tool.ts` no longer defaults a required field; CHANGELOG entry added; MINOR bump 0.4.0 → 0.5.0 in `package.json` and the lockfile root.

**Verified here:** this pod's `node_modules` was stale at ajv 6, so I installed the lockfile's ajv 8.20.0 (`--no-save`) to make the run faithful — then ran the 12 suites that touch the registry: **130/130 pass**, prettier clean, and the repo's doc/spec gates (`check-doc-blocks`, `check-doc-paths`, `check:regions`, `check:spec-links`, `spec:names`, `check:spec-status`) all pass. Per the pod's constraints I did not run eslint, tsc, or a build — CI judges those. The PR-body migration note is recorded in the CHANGELOG entry, since I have no `gh` access to edit the PR body.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"ajv named import broke ESM linking/typecheck (now default import), missing cause on thrown error, two eslint violations in the orchestrator-loop test, and execute had no input validation — all fixed; 130 tests pass against locked ajv 8.20.0"}}