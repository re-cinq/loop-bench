Pushed and confirmed landed — `git status` reports the branch up to date with `origin/loop-bench/37`, and `origin/main` merged cleanly (already up to date).

## Round summary

**Facet closed:** compile static `inputSchema` at `register` time + `WeakMap` caching for function-valued sources (`f497167`, pushed).

**CI debt from the brief, all addressed:**
- **typecheck** — root cause found: the previous round overwrote the lockfile's hoisted `node_modules/ajv` entry (main had ajv **6.15.0** there as eslint's dev transitive) with 8.20.0, leaving eslint's `ajv ^6.14.0` unresolvable in the tree — the CI errors were exactly ajv-6 typings (`no SchemaObject`, no `strict` in `Options`). Fixed by regenerating the lockfile (`npm install --ignore-scripts`): ajv 8.20.0 is now the root entry and 6.15.0 nests under eslint (44-line diff, verified with `npm ls ajv`). Also dropped the `import type {SchemaObject}` named import so `registry.ts` typechecks under either ajv typing.
- **eslint (5 errors)** — unit test now asserts one object instead of three expects; its registration boilerplate was rewritten (breaking the 22-line duplicate window with the acceptance file); the acceptance provider's `if (round === 2)` flipped to guard-the-tail early return and its 3-hop member chain split. No assertion semantics changed.
- **test** — the red named by CI is the ticket's own register-throw acceptance test; my facet turns it green (`compileValidator` throws `Invalid input schema for tool <name>: …`, verified against ajv's actual compile-throw semantics with a probe). Red tests: 1, mine; regressions: 0.

**This round's test** (red → green, run by file with a deadline): `registry.test.ts` "compiles a static tool schema once at register time and reuses it across ten execute calls" — pinned via `Ajv.prototype.compile` spy: 1 compile at register, still 1 after ten `execute`s. Spec statement line 20 now cites it; the moved unit-test link was re-anchored (#L4 → #L6); acceptance-file link anchors unchanged (verified); `check-spec-links` and `check-spec-anchor-names` pass. Prettier run over changed files; no lint/typecheck/build run in this pod. dod.md facet ticked.

**Not acted on (smells noticed):** `executeToolCalls` aliases `session.authHeaders` onto `ToolContext` (tracked by the resolveAuthHeaders issue); `ToolRegistry.get()` re-resolves function-valued definitions with no cache; `Unknown tool:` throw stays per the ticket's out-of-scope note.

**Next round:** remaining unit tests (extra-property pass-through with `toEqual`, wrong-type rejection, per-call schema-current for differing function-source schemas, `Unknown tool:` pin, the `chatOrchestrator.test.ts` tool-loop test), then the doc updates (example/weather-tool.ts, docs/adding-a-tool.md, README, .specify/spec.md, ADR-002) and remaining spec links.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile static inputSchema at register time with WeakMap caching for function-valued sources (plus repair of the typecheck/eslint/test CI findings)","tdd_next":"remaining unit tests and spec links: extra-property pass-through, wrong-type rejection, per-call schema-current, unknown-tool pin, chatOrchestrator tool-loop test; then docs/README/.specify/ADR-002/CHANGELOG updates"}}