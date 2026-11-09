Everything is landed and clean. Round complete.

## What this round did

The previous push's build was red on `typecheck`, `eslint`, and `test`. All findings are fixed on the branch (`ef1e185`, pushed):

**Root cause of the red test/typecheck** — the validation code assumed one ajv shape. The installed/locked ajv's types rejected the `{strict, validateFormats}` options object, and at runtime violations were read from `instancePath`, which CI's resolved ajv copy does not carry (hence `Cannot read properties of undefined (reading 'replace')` in the orchestrator-loop test). `registry.ts` now:
- constructs the compiler through a one-line cast that holds for either ajv major's type shapes (`strict: false, validateFormats: false, allErrors: true` kept),
- renders violation paths from `instancePath ?? dataPath` (both shapes), never echoing values,
- attaches `cause` to the schema-compile throw, with member chains ≤ 2 hops.

**Facet closed** — the `WeakMap` per-call validator cache for function-valued `ToolDefinitionSource`s (keyed on the resolved schema object; static tools keep their register-time validator), stored as a `StoredStaticTool | StoredDynamicTool` union so no unreachable branch exists.

**Tests** — `registry.test.ts` rewritten with the six registry-contract unit tests (missing-required rejection, `toEqual` passthrough of valid input including undeclared properties exactly once, `Unknown tool` throw pinned, compile-once across ten calls observed via a schema-read proxy, per-call schema currency for function sources, `WeakMap` reuse for the same schema object). The acceptance suite keeps every assertion; only its loop provider was flattened (`prefer-early-return`) and one 3-hop chain split.

**Spec** — all eight statements of `specs/hal-engine-tool-input-validation/spec.md` now cite tests with `#Lnn` anchors landing exactly on `it(` declarations (verified by the repo's `repoint-spec-anchors --check`, `check-spec-links`, `check-spec-status`, all green); status moved `In Progress → Shipped` as the coverage tier requires. `re-lint/require-spec-link` is satisfied for every new test.

**Verification here**: `tsc --noEmit` clean (it was failing before my changes, including a locally reproducible default-import error CI's log echoed in a different ajv shape) and my test file 6/6 green. I ran no acceptance tests — the pod's hook refuses them by name; CI judges them on the push. Branch is up to date with `origin/main`, working tree clean, `origin/loop-bench/37` at `ef1e185`.

**Red tests**: 0 mine; the CI-named red tests were all from the previous round's commit and are what this round repaired — none left unaddressed. **Named, not acted on**: the ticket's acceptance criterion places the tool-loop test in `chatOrchestrator.test.ts`, but the red-test round put it in `registry.acceptance.test.ts` — the behaviour is covered, the placement drifts from the ticket text; the remaining `chatOrchestrator.test.ts` unit coverage is the next facet's call.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"WeakMap per-call validator cache for function-valued sources, plus all CI findings from the previous push fixed (ajv-major-safe error paths and constructor cast, cause on the compile throw, member-chain/early-return/duplicate-code)","tdd_next":"chatOrchestrator.test.ts unit coverage for the rejection tool_result round, then the doc set (example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, ADR-002-response-validation.md)"}}