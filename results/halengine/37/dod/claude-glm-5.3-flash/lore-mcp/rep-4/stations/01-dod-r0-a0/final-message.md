Done. Branch `loop-bench/37` pushed (`57f32b5`), up to date with `origin/main`, working tree clean.

## Triage: `direct`

The seam already exists — `ToolRegistry.register`/`execute` and `createChatOrchestrator().processMessage` are real entry points callable today — so the tests call them directly and fail on the absent behaviour. No replacement module needed.

## What landed

- **`src/orchestration/tools/registry.acceptance.test.ts`** — 9 tests: rejection `ToolResponse` for a missing required property (executor count 0), wrong-typed value rejected naming path + expected type but never the value, enum enforcement, valid input + undeclared extras passed through unchanged (`toEqual`, exactly once — pin), `register` throwing on an uncompilable schema naming the tool, static schema compiled once across ten calls (observed via a getter on the schema object, so any compile-once mechanism passes and per-call recompilation fails), function-valued source validated against the schema current at each call, `Unknown tool:` throw preserved (pin), and identifying input values kept out of rejection text and log lines.
- **`src/orchestration/chatOrchestrator.acceptance.test.ts`** — a scripted provider drives a rejected tool call then a corrected retry: `processMessage` resolves, the rejection text is visible to the provider on the next round, executor ran once.
- **`specs/hal-engine-tool-input-validation/spec.md`** — the contract's statements, each carrying the inline `([validated by ...])` link; 11 citations verified by `check-spec-anchor-names`, `check-spec-links` (0 misplaced over 16 statements) and `check-spec-status`.
- **`.lore/dod.md`** — claim, strategy, test list, and the implementation facets owed (ajv in `dependencies`, one-line `execute` doc comment, README/docs/`.specify` edits, CHANGELOG + MINOR bump, PR migration note).

## Red bar (actual output, 8 failed / 2 passed — the 2 are pins)

```
● ToolRegistry input validation › rejects a call missing a required property and never invokes the executor
    - Expected  - 3
    + Received  + 3
      Array [
    -   0,
    -   true,
    -   true,
    +   1,        ← the executor ran on a call missing a required property
    +   false,    ← result names no property
    +   false,
      ]
● ToolRegistry input validation › throws at registration time for an uncompilable schema, naming the tool
    Expected pattern: /get_weather/
    Received function did not throw
● ChatOrchestrator tool input validation › feeds a schema rejection back to the model and completes on the corrected retry
    -   1,  +   2,      ← the malformed call reached the executor
    -   true, + false,   ← the provider was shown no rejection on the retry round
```

Neighbouring findings, for whoever implements: `.specify/spec.md:174` already claims the orchestrator "Validates tool calls against schemas" — false today, and the ticket's docs facet covers it; `example/weather-tool.ts` still casts/defaults, and its `#region` block is duplicated into `docs/adding-a-tool.md`, so the docs edits must go through `npm run docs:check` to stay in sync.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}