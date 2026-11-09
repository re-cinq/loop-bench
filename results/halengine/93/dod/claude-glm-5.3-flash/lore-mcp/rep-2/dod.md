# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` plus a scripted `AIProvider` (one array of chunks per `sendMessage` call) drives a real turn through real tool rounds, exactly the way the orchestrator's own tests do. The acceptance tests call that entry point today and fail on the behaviour the ticket reports.

## Done when these pass

- [ ] **reports usage covering every provider call of a two-tool-round turn** — a turn driven through two tool rounds hands `afterModelResponse` the componentwise sum of both rounds' usage (1200/300/1500 + 4100/900/5000 = 5300/1200/6500), plus the per-round breakdown
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still counts the rounds that reported usage when some rounds report none** — a round whose provider reported no usage contributes nothing rather than making the total `undefined` or `NaN`; the rounds that reported are still summed, in order, in the breakdown
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **reports nothing when no round of the turn reported usage** — a tool-using turn where no stop chunk carried usage hands the hook `totalUsage: undefined` and an empty breakdown, not a zeroed total
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **reports exactly what a no-tool turn reports today** — the common path does not move: one provider call is its own sum and its own breakdown
  `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (EXISTING, must stay green and unedited) — the ticket's own pin for the no-tool turn: the hook's usage argument deep-equals the single provider call's usage
  `src/orchestration/chatOrchestrator.test.ts`
- [ ] **keeps the usage an earlier round reported when a later round reports none** (EXISTING, must stay green and unedited) — a later round reporting no usage must not lose the value; it stays green under the summed semantics because the one reporting round is its own sum
  `src/orchestration/chatOrchestrator.test.ts`

## The chosen signature, and why

Decided per the ticket's "decide, and make the signature say the answer":

```typescript
afterModelResponse?: (
  session: ChatSession,
  responseText: string,
  totalUsage?: UsageMetadata,
  roundUsage?: UsageMetadata[]
) => Promise<void>;
```

- **Pass both** (the ticket's second shape): `totalUsage` sums every provider call that reported, `roundUsage` lists those calls' `UsageMetadata` in call order. This keeps provider-call granularity, which the ticket names as the faithful option, and the added surface is one optional array argument consumers may ignore.
- **The third argument stays a `UsageMetadata`** — summed, not wrapped — because the ticket requires a turn that ran no tools to report exactly what it reports today, pinned by the existing test remaining unedited. A wrapped `{total, rounds}` object as the third argument would move the common path and force an edit to that test, so it was rejected. The per-round breakdown rides in as a new fourth argument instead.
- **The third argument is renamed `usage` → `totalUsage`** so the signature itself answers "is this a sum?" (the ticket's fourth criterion). Parameter names carry no runtime cost for positional consumers; the behaviour change to what existing consumers record is the MINOR bump + changelog line the ticket already calls for.
- **Empty breakdown is `[]`, not `undefined`** when the hook fires with no usage anywhere, so a consumer never branches on two kinds of "none".
- Sum only what the providers reported: skip rounds with no usage (no zero-filling), never recompute `totalTokens` from the components — sum each field as reported.

## Facets

- [x] Write the red acceptance tests and replace the spec's recorded under-counting line with the new behaviour, citing these tests (`specs/hal-engine-config-hooks/spec.md` — done at DoD time; verify the wording still matches what you land)
- [ ] Collect usage per round in `src/orchestration/chatOrchestrator.ts`: replace the `lastUsage` local (`lastUsage = outcome.usage ?? lastUsage`) with a per-round list and a componentwise sum over the rounds that reported
- [ ] Extend `OrchestratorHooks.afterModelResponse` to the signature above and pass both values at the call site; `ts-jest` enforces the fourth argument's `UsageMetadata[]` type against the acceptance tests' annotated hook
- [ ] Add the CHANGELOG `Unreleased → Changed` entry: what an existing consumer records gets larger for tool-heavy turns (the sum replaces the last round's usage), parameter renamed `usage` → `totalUsage`, new `roundUsage` argument — MINOR bump, migration note per the repo's breaking-change rules. Note: CI's changelog gate diffs the branch against `origin/main`, so this commit alone shows that gate red until your entry lands; that is expected on this branch
- [ ] Green bar: the four acceptance tests pass; the two named existing tests stay green and unedited

## Out of scope

- The audit entry or billing record itself — a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape — providers already populate it; this issue only aggregates it
- The budget-exhausted turn's usage (the hook fires there too, and the sum covers whatever reported; no separate pin)