# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier
> rounds — including the one carrying the customer's question and the full tool
> results — are not counted anywhere. A deployer billing or budgeting from this
> hook under-counts exactly the expensive turns, and nothing in the signature
> hints at it.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` driven
with a scripted provider whose rounds report known, different token counts, and
an `afterModelResponse` hook that records what it is handed, exactly the way
`src/orchestration/chatOrchestrator.test.ts` already drives the orchestrator.
The under-count is observable today, so the acceptance tests fail on behaviour,
not on a missing module.

The signature decision this DoD pins (the ticket's two shapes): **accumulate
across rounds and pass the sum, keeping one `usage` argument** (shape one). The
summed total is what every acceptance criterion asks the hook to report, and the
per-round breakdown of shape two is surface no criterion needs — no consumer
ever had per-call granularity to lose, since the hook today hands over an
arbitrary subset (the last round). Record this rejection in the issue or PR
description; the ticket asks for it.

## Done when these pass

- [ ] **reports the usage of every provider call in a two-round tool turn, not
      only the last round** — red today: the hook receives the second round's
      `{inputTokens: 40, outputTokens: 50, totalTokens: 90}` where the turn's calls
      sum to `{140, 60, 200}`
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still counts the rounds that reported when a middle round reports no
      usage, and never reports NaN** — red today: rounds one and three report, two
      does not; the hook must receive `{15, 6, 21}`, not the last round's `{5, 4, 9}`
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still reports nothing when no round in the turn reported usage** — green
      today by design: this is the property the accumulator must preserve, so a
      naive sum-initialised-to-zeros implementation cannot turn `undefined` into
      `{0, 0, 0}` or `NaN` without a red bar
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **receives collected response text and usage** (existing, must stay green
      and unedited) — the no-tool turn reports exactly what it reports today
      `src/orchestration/chatOrchestrator.test.ts`
- [ ] **keeps the usage an earlier round reported when a later round reports
      none** (existing, must stay green and unedited) — a sum over the rounds that
      reported equals the sole reporter here, so the current expectation holds
      unchanged under the new behaviour
      `src/orchestration/chatOrchestrator.test.ts`
- [ ] **hands afterModelResponse text ending in the sentence, and the usage of a
      run without the hook** (existing, must stay green and unedited) — the
      budget-exhausted path reports the same way with and without the hook
      `src/orchestration/toolBudget.test.ts`

## Facets

- [ ] Sum in the orchestrator: in `src/orchestration/chatOrchestrator.ts`
      replace `lastUsage = outcome.usage ?? lastUsage` (line 117) with a turn
      accumulator that adds each round's `inputTokens`/`outputTokens`/`totalTokens`
      when that round reported, and stays `undefined` when none did.
- [ ] Make the signature say it (the ticket's fourth criterion): add
      `TurnUsage` — the turn-scoped total, same three fields as `UsageMetadata` — to
      `src/types/ai.ts`, re-export it from `src/types/index.ts` and `src/index.ts`,
      and annotate the hook's third parameter with it, e.g.
      `afterModelResponse?: (session, responseText, totalUsage?: TurnUsage) => ...`,
      with a one-line comment saying it is the sum over the turn's provider calls.
      This criterion is compile-time and jest cannot see it here: ts-jest runs with
      tsconfig `isolatedModules: true`, so the suite passes a file that imports an
      export that does not exist (verified in this pod with a probe file). The red
      bar for it is CI's `Type check` step (`tsc --noEmit`) in the `Verify` job of
      `.github/workflows/ci.yml`, which fails with `TS2305` until the type is
      exported and the parameter annotated.
- [ ] Spec: replace the recorded under-counting bullet at
      `specs/hal-engine-config-hooks/spec.md` line 28 with the new behaviour, cited
      to the three new tests — `([validated by: reports the usage of every provider call in a two-round tool turn, not only the last round](../../src/orchestration/chatOrchestrator.usage.acceptance.test.ts#L54))`,
      and likewise for the other two (`...#L74` and `...#L96`), whose anchors must
      land on their `it(` lines — then update the hook signature shown in
      `specs/hal-engine-architecture/spec.md` line 199 and run
      `npm run spec:names:fix` to repoint the lines. Do not edit the `| Status |`
      row. No existing `#Lnn` citation shifts otherwise: the new tests live in new
      files, so no line below an insertion moves.
- [ ] CHANGELOG: a line under `## [Unreleased]` → `### Changed` stating the
      change in what an existing consumer records — for a turn that ran tools the
      hook's usage argument now covers every provider call, so recorded values grow
      — and that this is the MINOR bump the release names.
- [ ] Record in the issue (or PR description) why the pass-both shape was
      rejected; the ticket asks the losing shape to be argued against.

## Out of scope

- The audit entry or billing record itself — a consumer's concern, per the
  ticket.
- Token accounting for anything other than the provider calls the orchestrator
  makes, and the `stop` chunk's own `usage` shape — providers populate it, this
  issue only aggregates.
- The per-round breakdown / a fourth hook argument — the rejected shape two; if
  someone wants it later it is a separate, additive issue.
- `onToolBudgetExhausted` and the budget paths' ordering — the sum flows through
  the exhausted turn unchanged, and its existing test already pins that.
- The package.json version bump and docs examples (`docs/getting-started.md`
  line 130 keeps working with the renamed parameter): release-time and cosmetic,
  not criteria of this ticket.