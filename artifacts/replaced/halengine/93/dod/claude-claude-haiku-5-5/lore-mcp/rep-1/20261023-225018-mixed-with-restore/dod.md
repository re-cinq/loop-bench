# Definition of Done

> The reporter's claim, verbatim from the ticket: "so what the hook receives is the usage of the final provider call alone."

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` takes an `AIProvider` and `options.hooks`, so a scripted provider can report known usage per round and the `afterModelResponse` hook records what it is handed. No production change is needed to reach the behaviour.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — three provider calls report 15, 27 and 39 total tokens; the hook must receive the summed usage (60 / 21 / 81), not the final call's alone
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`
- [ ] **leaves out a round that reported nothing, and reports nothing when no round did** — a silent middle round is skipped without producing `NaN` or `undefined` (sum of the two reporting rounds, 30 / 12 / 42); a turn where no round reported still hands the hook `undefined`
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

Existing test that must stay green and unedited: `src/orchestration/chatOrchestrator.test.ts` — "receives collected response text and usage" (single-round usage is unchanged) and "keeps the usage an earlier round reported when a later round reports none" (14 stays 14 under a sum).

## Facets

- [x] Choose the shape: sum into the single `usage` argument, or pass both the sum and the per-round breakdown. Record the choice and the rejected alternative in the issue. (Chose sum; per-round breakdown rejected as wider surface without consumer need.)
- [x] Accumulate usage across provider calls in `chatOrchestrator.ts` in place of `lastUsage = outcome.usage ?? lastUsage`, skipping rounds that report nothing.
- [x] Make the hook's usage type say it is a turn total (`src/orchestration/chatOrchestrator.ts`, `src/types/ai.ts`), with no `any` in the public API. (Added `TurnUsageMetadata = UsageMetadata` type alias; hook signature updated.)
- [x] Replace the under-counting line in `specs/hal-engine-config-hooks/spec.md` with the new behaviour, and link the acceptance tests on that statement once it is written.
- [x] Add a CHANGELOG entry stating the change in what an existing consumer will record (MINOR bump).

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape, which providers already populate; this ticket only aggregates it.
- The `onError` gate on `error instanceof Error` recorded in the same spec; a separate, out-of-scope change.