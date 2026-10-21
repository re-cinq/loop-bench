Round complete. Summary:

**Facet closed** — schema validation in `ToolRegistry.execute` (dod facets 1–3):
- Added `ajv@^8.20.0` to `dependencies` (lockfile synced, `npm ci` dry-run verified), version bumped `0.3.0 → 0.4.0` (MINOR), CHANGELOG `Unreleased` entry added.
- `register` compiles a static `inputSchema` once and throws naming the tool when ajv can't compile it; function-valued sources resolve per call with validators cached by schema object (`WeakMap`).
- `execute` validates before the executor: rejection returns `{result}` naming property paths and the failed constraint (`location is required`, `ssn must be of type string`), never the offending value — nothing value-bearing reaches `result` or the log line. No coercion, defaults, or injected `additionalProperties`; unknown-tool throw untouched. One-line doc comment on `execute` pointing at the spec.

**Test** — new `src/orchestration/tools/registry.test.ts`, one test, run red then green by file only (`jest --runTestsByPath`, 0.2s), green after the refactor (rejection path extracted to `rejectionFor`). Spec statement added with its `([validated by …])` anchor at the `it(` line; `check-spec-anchor-names`, `check-spec-links`, `check-spec-status`, `repoint-spec-anchors --check origin/main` and `check-changelog` all pass. Prettier run over the two changed TS files.

**Reds**: 1 red test this round — mine, taken green. No regressions observed; no other suite was run here, CI judges the push.

**Disclosures**: `npm install` fired its `prepare` hook once, running the build (`tsc -p tsconfig.build.json`) before I caught it — it completed without incident, `dist/` deleted; no build was run after that. Its first pass also rewrote `package-lock.json` into a state `npm ci` rejects until a second reconcile pass fixed it; the branch diff carries some npm-11 metadata churn (`"peer": true` flags, relocated `@emnapi/*` entries) beyond the ajv addition itself. No `round-brief.md` existed, and the `lore_*` graph tools are not present in this pod, so coverage of the registry was checked by grep instead. Smells noticed, not acted on: the happy-path `log.info('tool', 'executing', {inputKeys})` still publishes property *names* of tool input, which for a single-key sensitive schema is itself identifying context; and `ToolRegistry` double-caches compiled schemas (own `WeakMap` plus ajv's internal serialized-schema cache), which is only correct while `.errors` is read synchronously before any `await`.

Smells named above are for a later round; no acceptance tests were run locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"input validated against inputSchema in ToolRegistry.execute with ajv (register-time compile, WeakMap cache, MINOR bump)","tdd_next":"remaining registry.test.ts unit tests (passthrough, unknown tool, compile-once, per-call schema, no value leak) plus the chatOrchestrator rejection-retry test"}}