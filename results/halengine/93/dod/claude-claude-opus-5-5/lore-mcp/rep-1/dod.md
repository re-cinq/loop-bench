# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted `AIProvider` and a real `ToolRegistry` already drives a turn through several tool rounds and observes what `afterModelResponse` receives; the tests fail today because the hook gets the last round's usage (300/30/330) instead of the sum.

Decision recorded for the issue: accumulate across rounds and pass the sum through the existing single `usage` argument. The per-round-breakdown shape was rejected as wider public surface than any consumer has asked for; a consumer that wants provider-call granularity can still read each `stop` chunk's `usage` from the stream. Because the number grows for tool-heavy turns, this is a MINOR bump with a CHANGELOG line saying so.

## Done when these pass

- [ ] **reports the sum of every provider call in a turn that ran two tool rounds** — three provider calls reporting 110, 220 and 330 total tokens hand the hook 600/60/660
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts only the rounds that reported usage, and reports none when no round did** — a middle round without usage is skipped (400/40/440, no `NaN`), and a tool turn where no round reported hands the hook `undefined`
      `src/orchestration/turnUsage.acceptance.test.ts`

The no-tool path is pinned by the existing, unedited `afterModelResponse › receives collected response text and usage` and `keeps the usage an earlier round reported when a later round reports none` in `src/orchestration/chatOrchestrator.test.ts`; both must stay green without edits.

## Facets

- [ ] Replace the `lastUsage` local in `chatOrchestrator.ts` with a turn total that adds each round's `outcome.usage` field by field, staying `undefined` until a round reports
- [ ] Make the hook's type say it is a sum: e.g. a `TurnUsage` alias of `UsageMetadata` exported from `src/types/ai.ts`, the `afterModelResponse` parameter renamed `turnUsage`, and a one-line doc comment (regenerate the CLAUDE.md hooks block if it is generated from the declaration)
- [ ] CHANGELOG entry (MINOR): an existing consumer of `afterModelResponse` now records the whole turn's usage, so tool-heavy turns report larger numbers than before
- [ ] Spec `specs/hal-engine-config-hooks/spec.md` already carries the new statements and drops the under-counting line; re-anchor its links if the test file moves

## Out of scope

- The audit entry or billing record itself (a consumer's concern)
- Token accounting for anything other than the orchestrator's provider calls (e.g. `generateStructured`)
- The `stop` chunk's own `usage` shape
- The non-`Error` rejection bypassing `onError`, still recorded under Measured semantics