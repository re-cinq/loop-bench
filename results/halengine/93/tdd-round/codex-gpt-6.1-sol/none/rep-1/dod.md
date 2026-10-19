# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is the real entry point; the tests drive multi-round turns through it and assert on the `usage` the hook receives. Shape chosen: accumulate across rounds and pass the sum as the single `usage` argument (the per-round breakdown was rejected as wider public surface than any consumer has asked for; the sum changes what existing consumers record, so it ships as a MINOR bump with a changelog line).

## Done when these pass

- [ ] **reports 600 input, 60 output, 660 total for a two-tool-round turn whose calls report 100/10, 200/20 and 300/30** — a turn driven through two tool rounds reports usage covering all three provider calls
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts only the rounds that reported usage, and reports undefined when none did** — a round with no usage neither drops nor poisons the sum; a turn with no usage at all still reports `undefined`
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (EXISTING, must stay green and unedited) — a turn with no tool calls reports exactly its single call's usage, as it does today
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Accumulate per-round `usage` into a running turn total in `chatOrchestrator.ts`, adding a field-wise sum as a pure function, and pass the total to `afterModelResponse`
- [ ] Make the hook's signature say it is a turn total (parameter name and one-line doc on `afterModelResponse`, or a named type alias over `UsageMetadata`), no `any`; regenerate the CLAUDE.md hooks block if it is generated from the declaration
- [ ] Delete the under-counting bullet from "Measured semantics — out of scope" in `specs/hal-engine-config-hooks/spec.md` (the new "Usage reported to afterModelResponse" section replaces it) and re-anchor any shifted `#L` links
- [ ] CHANGELOG entry stating that `afterModelResponse` now receives the sum across tool rounds, so existing consumers record larger numbers for tool-using turns; MINOR bump

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate
- `onError` skipping non-`Error` rejections, the other measured-semantics bullet in the same spec