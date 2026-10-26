Branch is pushed and up to date. Here's a summary of what this round fixed:

**Fixes applied (all three CI failures):**

1. **typecheck** — `async () => ({data: 'found'})` in both test registrations returned `{data: string}` which isn't assignable to `string | ToolResponse`. Changed to `async () => 'found'` (a plain string).

2. **eslint (no-duplicate-code)** — Extracted 5 shared helpers (`createLookupRegistry`, `captureUsage`, `makeProvider`, `toolRoundChunks`, `finalRoundChunks`) that eliminated the 10-line and 32-line duplicate blocks the linter flagged.

3. **eslint (require-spec-link)** — Added `([validated by: ...](path#Lnn))` citations in `specs/hal-engine-config-hooks/spec.md` for all 6 new tests (orchestratorHelpers:11,20,28,36 and acceptance:65,75).

4. **spec-names** — Re-anchored the 4 `shouldContinueToolLoop` citations in the architecture spec that had drifted when the `addUsage` describe block was prepended to orchestratorHelpers.test.ts.

Unrelated smells noticed but not acted on: the "Measured semantics — out of scope" section header in `specs/hal-engine-config-hooks/spec.md` is now misleading since ticket #93 did change those semantics — worth renaming in a future pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec links, type fix, duplicate code elimination — all CI failures resolved","tdd_next":"acceptance green"}}