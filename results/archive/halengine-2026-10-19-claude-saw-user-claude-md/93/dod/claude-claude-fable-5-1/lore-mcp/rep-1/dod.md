# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.
>
> For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — the seam exists today: `createChatOrchestrator` takes a real `AIProvider` and `OrchestratorHooks`, so a scripted provider whose rounds carry known, different `usage` values drives the tool loop end to end and the `afterModelResponse` hook observes what the turn reported. No double is needed.

The tests assert on the hook's third argument (`usage`) and are indifferent to which of the ticket's two shapes is chosen: the acceptance criterion that the no-tool test `receives collected response text and usage` stays unedited means the third argument on a single-round turn must deep-equal the provider's `UsageMetadata`, so the sum has to arrive in that argument either way. A per-round breakdown, if the implementer chooses to pass one, is additional surface these tests neither require nor forbid.

This repository's `tests.list` descriptor carries only `id`, `name` and `file` (see `scripts/lore-list-tests.mjs`), so there is no in-test spec anchor to stamp; traceability is the trailing `[validated by: <title>](...#Lnn)` citation in the spec, per AGENTS.md § Spec Test Links.

## Done when these pass

- [ ] **reports the sum of three provider calls when a turn runs two tool rounds** — rounds reporting 100/10/110, 200/20/220 and 300/30/330 tokens are handed to the hook as 600/60/660; today it receives 300/30/330
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when one round reports none, and reports nothing when no round did** — rounds reporting 7/2/9, nothing, and 5/1/6 sum to 12/3/15 (today: 5/1/6), and a turn in which no round reported still hands the hook `undefined`, never `NaN`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Existing tests that must stay green and unedited: `receives collected response text and usage` (the no-tool path, `src/orchestration/chatOrchestrator.test.ts#L236`) and `keeps the usage an earlier round reported when a later round reports none` (`#L527`, a one-reporting-round sum equals that round).

## Facets

- [x] Accumulate `outcome.usage` across rounds in `chatOrchestrator.ts` instead of overwriting `lastUsage`: a round with no usage adds nothing, and a turn with no reported usage stays `undefined`; the first acceptance test goes green
- [x] Skipping an unreported round keeps the total a number; the second acceptance test goes green
- [ ] Make the signature say it is a sum: name or document the `afterModelResponse` usage parameter in `OrchestratorHooks` (`src/orchestration/chatOrchestrator.ts`) and, if a breakdown is passed too, type it, with no `any`; regenerate the CLAUDE.md hooks block if it is generated from the declaration
- [ ] Record in the issue which of the two shapes was chosen and why the other was rejected
- [x] CHANGELOG `[Unreleased]` → `Changed`: state that an existing `afterModelResponse` consumer now records a larger number on tool-heavy turns, and that a no-tool turn is unchanged (MINOR bump per the ticket)
- [x] `specs/hal-engine-config-hooks/spec.md`: the under-counting line is already replaced by the "Usage reported to afterModelResponse" section on this branch; 4 addUsage unit-test spec statements added and status set to "In Progress"; no further shifts require reanchor
- [ ] `example/full-config.ts`: the "turn's total" comment is absent; example and CHANGELOG agree — no change needed

## Out of scope

- The audit entry or billing record itself: a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes (no `generateStructured`, no prompt-building cost)
- The `stop` chunk's own `usage` shape, which providers already populate
- The `error instanceof Error` gate on `onError`, still recorded under "Measured semantics — out of scope" in the spec