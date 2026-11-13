# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider, a real `ToolRegistry` and an `afterModelResponse` hook is the seam: the tests drive real tool rounds and read the `usage` argument the hook receives. No production code needs to exist first.

## Done when these pass

- [ ] **reports usage summed over every provider call of a turn that ran two tool rounds** — three provider calls reporting different known token counts; the hook's `usage` argument is their field-wise sum, not the last round's
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when another round reported none, and reports nothing when none did** — a round with no usage neither drops the others nor yields `NaN`/`undefined`; a turn where no round reported still hands the hook `undefined`
      `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (EXISTING, must stay green and UNEDITED) — a turn with no tool calls reports exactly what it reports today
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate usage across rounds in `chatOrchestrator.ts` (replace `lastUsage = outcome.usage ?? lastUsage` with a field-wise sum that stays `undefined` until a round reports)
- [ ] Make the type say it is a sum: rename the hook's third parameter / document it (e.g. a `TurnUsage` alias or `turnUsage` name on `afterModelResponse`), mirrored in the generated CLAUDE.md hooks block; if a per-round breakdown is also passed, add it as a further argument so the third stays the sum the tests assert
- [ ] Record on the issue why the other shape (sum + per-round breakdown vs. sum only) was rejected
- [ ] `specs/hal-engine-config-hooks/spec.md`: replace the "most recent round's usage, not a sum" line under Measured semantics with the new behaviour, citing the acceptance tests as `([validated by ...](../../src/orchestration/turnUsage.acceptance.test.ts#Lnn))`, then run `node scripts/spec-links/reanchor.mjs` if present
- [ ] CHANGELOG entry stating an existing consumer now records larger numbers for tool-using turns (MINOR bump)
- [ ] The existing test "keeps the usage an earlier round reported when a later round reports none" stays green (its scenario is a sum with one term)

## Out of scope

- The audit entry or billing record itself — a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes (e.g. `generateStructured`)
- The `stop` chunk's own `usage` shape, which providers already populate