# Definition of Done

> so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes a scripted provider, a tool registry and `hooks.afterModelResponse`, so the hook's usage argument is read through the real entry point. The tests pin only that the one `usage` argument is the turn total, so a design that also passes a per-round breakdown still passes. The red bar is CI's to show too, in the Lore `hal-engine-jest` test-command and the "Test" step of `.github/workflows/ci.yml`.

## Done when these pass

- [ ] **reports 660 total tokens for a turn of two tool rounds and a final answer** — three provider calls report 110, 220 and 330 tokens, and the hook must receive their sum rather than the last call's 330. Red today: the hook receives `{inputTokens: 300, outputTokens: 30, totalTokens: 330}`.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **sums the rounds that reported to 60 tokens and reports undefined when no round reported** — a tool round that reports no usage is skipped rather than shadowing the sum, and a turn where no round reports still hands the hook `undefined`. Red today: the partially reported turn yields the last reporting round's 45 tokens instead of 60; the unreported half already passes.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** — existing guard for the no-tool path: a turn with no tool calls must keep handing the hook exactly the provider's usage. Passes today and must stay green and unedited.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [x] Replace `lastUsage = outcome.usage ?? lastUsage` in `src/orchestration/chatOrchestrator.ts` with a sum over every round that reported usage, leaving `undefined` when none did.
- [ ] Make the hook's usage argument's type say it is a turn total (`src/types/ai.ts`, `OrchestratorHooks` in `src/orchestration/chatOrchestrator.ts`); CI's typecheck is the check, since a type has no runtime test.
- [x] Fix spec-links/eslint CI failures: three usage-reporting statements in `specs/hal-engine-config-hooks/spec.md` were unlinked (two two-sentence paragraphs split at mid-paragraph period; one sentence with no link); addUsage sub-claims had misplaced inline links — all fixed by restructuring to single sentences with one trailing parenthetical each.
- [x] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` with the new behaviour, and add the CHANGELOG entry stating what an existing consumer will record for tool-heavy turns (MINOR bump).

## Out of scope

- The audit entry or billing record itself; that is the consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape; providers already populate it and this ticket only aggregates it.
- The per-round breakdown alternative: not ruled out by these tests, but not required by them either.
- Acceptance criteria 4 (type clarity), 5 (spec and CHANGELOG text) and 6 (build, lint, format gates): these are checked by CI's typecheck, eslint, prettier and review, not by a behaviour test.