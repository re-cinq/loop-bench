# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes hooks and a provider, so the acceptance tests drive the real orchestrator with a provider scripted round by round and fail today on the behaviour the ticket names — `afterModelResponse` receives the last round's usage alone, and nothing on its type hints at aggregation. Both tests are red now (jest run quoted on the branch's opening round); the type half of the first red bar is CI's to show, because this pod's ts-jest is transpile-only and the pod is barred from running `tsc`.

## Done when these pass

- [ ] **reports the usage of every provider call in a turn that ran two tool rounds, not the last round alone** — a scripted provider reports {inputTokens: 100, outputTokens: 20, totalTokens: 120} on the tool round and {30, 5, 35} on the closing round; the hook must receive the sum {130, 25, 155}, and a per-round breakdown must be readable off the hook's usage parameter (the test reads `usage?.rounds`, which `npm run typecheck` rejects until the type exposes it).
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage when a round reports none, and still reports nothing when no round did** — with a silent middle round the two reporting rounds are still summed ({57, 12, 69}, never `undefined` or `NaN`); a turn whose provider never reported still reports `undefined`.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate across rounds in `src/orchestration/chatOrchestrator.ts` (the `lastUsage` local): the hook's usage argument keeps its `UsageMetadata` shape and carries the turn total — the sum of the rounds that reported; a round reporting nothing contributes nothing; a turn where none reported still reports `undefined`. This turns both jest reds green.
- [ ] Widen what the hook receives with the per-round breakdown (e.g. `TurnUsage extends UsageMetadata` with optional `rounds: UsageMetadata[]`, one entry per provider call that reported), so the signature itself says the flat counts are a sum; keep it assignable to `UsageMetadata` so existing consumers compile unedited. This turns CI's Type check step green on `usage?.rounds`.
- [ ] Keep `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` green and UNEDITED — it pins the no-tool path reporting exactly what it reports today. It is deliberately not listed under Done when these pass so later rounds can still run its file.
- [ ] CHANGELOG `## [Unreleased]` → `### Changed`: a line stating what an existing consumer will now record for tool-heavy turns (a MINOR-worthy behaviour change; `scripts/check-changelog.sh` gates it).
- [ ] CI Verify green: Lint, Format check, Test (the `src/orchestration/` coverage floors hold with the accumulation code), Spec citations name their test, Spec link placement, Spec anchor check (skips this spec whole, since its anchor set now differs from origin/main).

## Out of scope

- The audit entry or billing record itself — a consumer's concern (ticket tech notes).
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates.
- The other recorded out-of-scope semantics of `specs/hal-engine-config-hooks/spec.md` (`onError` gated on `error instanceof Error`).