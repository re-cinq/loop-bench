Round complete and pushed (`429bdf1`), branch up to date with `origin/loop-bench/37` and merged against `origin/main` (no-op — main hasn't moved).

## What this round did

**Facet closed** — *rejects input missing a required property with a ToolResponse and never calls the executor* (first acceptance criterion):

- **RED**: new `src/orchestration/tools/registry.test.ts` (the file the ticket says to create) — one test: tool requiring `location`, `execute` with `{}`. Failed for the right reason: executor ran, no rejection returned.
- **GREEN**: `ajv@^8.20.0` added to `dependencies` (version bumped 0.3.0 → 0.4.0); `execute` validates input against the resolved `inputSchema` and returns `{result}` naming path + constraint — e.g. `input must have required property 'location'` — before the executor; log lines carry paths/keywords only, never values. Static schemas compile at `register` (invalid schema throws naming the tool), validators cached by schema-object identity in a `WeakMap`, so function-valued sources validate against the schema current at each call. One-line doc comment on `execute` pointing at `specs/hal-engine-tool-input-validation/spec.md`. I probe-verified via a throwaway `node -e` (not a test run) that compile throws under `strict: false` and that error text carries no input values.
- **REFACTOR**: collapsed the duplicated `'input'`-fallback rule into one `schemaRejections` helper feeding both the log field and the rejection text; `validatorFor` now takes the whole definition. Bar stayed green.

**Test runs here**: only `registry.test.ts` — red once, then green twice (incl. post-refactor). No acceptance tests, no full suite, no lint/typecheck/build in this pod. **Red tests mine: 0; regressions: 0 known** — the only other in-suite registry caller (`chatOrchestrator.test.ts`) sends schema-valid input (`{q:'x'}` against `{type:'object'}`); CI confirms the rest.

**Gates run locally** (light scripts, not the suite): prettier clean, `check-spec-links` / `spec:names` / `check-spec-status` / `check-changelog` all pass; `repoint-spec-anchors` skipped the new spec file (absent on `origin/main`), so I hand-set the citation to the `it(` line (L4). Spec statement now carries both the acceptance and unit citations; CHANGELOG entry added under `[Unreleased]`.

**Facet next**: the remaining registry unit tests — pass-through with `toEqual` (extra keys, exactly once), wrong-type rejection without value leak, compiled-once across ten calls, per-call schema currency — then the orchestrator-loop/docs facet (`README`, `docs/adding-a-tool.md`, `.specify/spec.md`, `example/weather-tool.ts`, ADR-002).

**Noted, not acted on**: (1) pre-existing high/critical npm advisories in the express tree (`body-parser`, `proxy-addr`, `qs`) — unrelated to ajv, unchanged by this diff; (2) my `npm install` normalized the lockfile, dropping two dev-only optional peer-fallback entries (`@emnapi/core`, `@emnapi/runtime`); eslint's nested ajv@6 verified intact; (3) docs/README still describing unvalidated input is ticketed facet work, not a smell.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"execute rejects input missing a required property with a ToolResponse and never calls the executor (registry.test.ts, ajv validation + register-time compile + WeakMap cache)","tdd_next":"registry unit tests for pass-through (toEqual), wrong-type rejection without value leak, compiled-once, per-call schema currency, Unknown-tool pin"}}