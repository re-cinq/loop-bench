# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` driven through its real `processMessage` entry point with a scripted `AIProvider` and a real `ToolRegistry` runs a genuine multi-round tool turn today, and the hook's usage argument is directly observable, so the tests fail on the reported numbers rather than on a missing module. CI's `Verify` job (`.github/workflows/ci.yml`) runs the full gate — typecheck, eslint, prettier, Test (with coverage floor), Build, spec gates — on every push; only the named tests below were run in this pod.

## Done when these pass

- [ ] **reports usage covering every provider call in a turn driven through two tool rounds** — a turn spanning three provider calls whose rounds report known, different token counts (120/15/135, then 340/45/385, then 60/9/69); the hook receives the field-wise sums 520/69/589. Red today: it receives 60/9/69, the final provider call alone.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when a round reports no usage** — the middle round's stop chunk carries no usage; the two rounds that did report are still summed to 180/24/204, and no field is `undefined` or `NaN`. Red today for the same under-count (it receives 60/9/69).
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **reports no usage when no provider call in the turn reported one** — guard, green today and required to stay green: a turn where no provider call reported usage still hands the hook `undefined`, not zeros. Written now so an accumulator cannot quietly turn nothing into `{0,0,0}` or `NaN` on its way to making the two red tests pass.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Turn the accumulation on in `src/orchestration/chatOrchestrator.ts`: build what `afterModelResponse` receives at the call site (currently `lastUsage`, `chatOrchestrator.ts:148`) field-wise from every round's `outcome.usage`, so the first test goes green; a round reporting nothing contributes nothing, which turns the second test green.
- [ ] Keep the nothing-reported case reporting nothing, so the third test stays green: a turn where no provider call reported usage hands the hook `undefined`.
- [ ] Make the type say the answer (acceptance criterion 4): name and type what the hook receives so a reader sees it is the turn total without opening the orchestrator — e.g. a documented type in `src/types/ai.ts` beside `UsageMetadata`, or a renamed hook parameter — exported from `src/index.ts` if new, with no `any`. If the chosen shape also passes a per-round breakdown beside the total (ticket "What to do", shape B), extend the spec's "Usage reported to afterModelResponse" section to state it.
- [ ] Record in the issue why the rejected shape was rejected (ticket "What to do" asks the issue to carry the decision).
- [ ] `CHANGELOG.md`: a `## [Unreleased]` → `### Changed` entry stating the change in what an existing consumer will record — tool-heavy turns now report larger numbers — with the MINOR bump that implies. CI's "Changelog entry" step fails any pull request touching non-test files under `src/` without it.
- [ ] Keep `src/orchestration/chatOrchestrator.test.ts` unedited and green: its `ChatOrchestrator hooks > afterModelResponse > receives collected response text and usage` (line 236) is the ticket's own pin for "a turn with no tool calls reports exactly what it reports today" (criterion 2) and passed unedited when this DoD was written. Its neighbour at line 527, `keeps the usage an earlier round reported when a later round reports none`, already agrees with summing only the rounds that reported, so it stays green under the change, as does `src/orchestration/toolBudget.test.ts` line 214, whose scripted rounds all report identical usage.

## Out of scope

- The audit entry or billing record itself — a consumer's concern (ticket Tech notes).
- Token accounting for anything other than the provider calls the orchestrator makes (ticket Tech notes).
- The `stop` chunk's own `usage` shape and everything the stream yields per round: providers already populate it and either shape leaves the streaming surface untouched — this ticket only aggregates what the hook receives (ticket Tech notes).
- Turns closed by the tool budget: the same accumulation covers them, and no separate pin is owed for `onToolBudgetExhausted` turns.