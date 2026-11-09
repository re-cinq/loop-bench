# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to
> record what a turn cost — an audit entry, a billing line, a usage budget. It
> is called once per user message, after the round loop exits, and is handed
> the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage =
> outcome.usage ?? lastUsage` on each round, so what the hook receives is the
> usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` is
the real entry point and a scripted provider (one array of chunks per
`sendMessage` call, as `chatOrchestrator.test.ts` already does) drives the tool
loop round by round, so a two-round turn with known, different token counts is
expressible today. Nothing is owed to structure; the change is one local and
one call site plus the hook type.

**Shape the tests pin** (the ticket says "decide"; this is the decision): pass
both. The third argument keeps its position and type — `usage` becomes the sum
across every provider call of the turn — and a new fourth argument carries each
call's own `UsageMetadata` in call order (call it `rounds`). Accumulate-only
was rejected because of acceptance criterion 4: a bare `UsageMetadata` third
argument cannot say whether it is a sum, and the reader is back to opening the
orchestrator, which the criterion forbids. No-tool turns keep exactly today's
report, because the single call's sum is that call's usage. The rejected-shape
rationale is to be recorded on the issue by the implementing round.

**A jest quirk the next pod must know:** ts-jest here is transpile-only —
`npm test` does not fail on type errors (verified with a deliberate type
error). So criterion 4's static half is enforced two ways: the acceptance
helper installs `afterModelResponse` as a four-argument consumer literal, which
`npm run typecheck` refuses until the published signature declares the fourth
argument (CI's `Verify` job runs that typecheck), and the same test asserts the
fourth value arrives. Do not "fix" the type error by editing the test; declare
the argument.

## Done when these pass

- [ ] **reports the sum of every provider call in a two-round turn, with each
  call reported apart** — two rounds reporting known, different token counts
  (10/4/14 then 100/40/140); the hook receives `usage` = 110/44/154 and the
  per-call breakdown `[firstCall, secondCall]`. Today it receives the last
  call's usage alone and no fourth argument. Red now. Covers criteria 1 and 4.
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **counts the calls that reported when a silent round sits between them** —
  three rounds, the middle reporting no usage; the total is still the sum of the
  two that reported (110/44/154), not `NaN`, not `undefined`, not the last
  reported call alone (today's value, 100/40/140). Red now. Covers criterion 3,
  first clause.
  `src/orchestration/turnUsage.acceptance.test.ts`
- [ ] **still reports nothing when no provider call in the turn reported
  usage** — a turn where no round reported receives `undefined`. Green now by
  design: this is the preservation clause of criterion 3, pinned so a naive sum
  cannot turn it into `{0,0,0}` or `NaN`.
  `src/orchestration/turnUsage.acceptance.test.ts`

Criterion 2 (a no-tool turn reports exactly what it reports today) is pinned by
the existing `receives collected response text and usage` test remaining
unedited — it passed unedited when this DoD was written (24/24 in
`src/orchestration/chatOrchestrator.test.ts`), and so did the sibling `keeps
the usage an earlier round reported when a later round reports none`, which a
correct sum also satisfies (one reporting round sums to itself). The spec
statement for criterion 2 cites that existing test.

## Facets

- [ ] Red: the two failing tests above fail for the ticket's reason — the hook
  gets the final provider call's usage alone (quoted in the run: received
  100/40/140, expected 110/44/154; `perRound` undefined).
- [ ] Green: accumulate the round outcomes in `processMessageStream` — add each
  round's `outcome.usage` into the running total, skipping rounds that reported
  none, and pass the total as the third hook argument; `undefined` when nothing
  reported.
- [ ] Green: pass the per-call breakdown as a fourth hook argument, one
  `UsageMetadata` per provider call that reported, in call order.
- [ ] Green: declare the fourth argument on
  `OrchestratorHooks.afterModelResponse` (`rounds?: UsageMetadata[]`) so the
  signature says the answer; the acceptance helper's four-argument consumer
  literal then typechecks. No `any`.
- [ ] Docs: `CLAUDE.md`'s OrchestratorHooks block is generated from the
  declaration — run `npm run docs:fix` (or hand-regenerate) after editing the
  signature, or `npm run docs:check` fails.
- [ ] Docs: CHANGELOG `[Unreleased]` gains a `### Changed` entry written for an
  existing consumer: what an `afterModelResponse` hook records grows on
  tool-heavy turns (the sum of every provider call instead of the last call's),
  a no-tool turn is unchanged; MINOR bump per the repo's breaking-behaviour
  rule. Record on re-cinq/HALEngine#93 why accumulate-only was rejected.
- [ ] Spec: `specs/hal-engine-config-hooks/spec.md` already replaces the
  recorded under-counting bullet with the four new statements (criterion 5);
  they cite the tests above and go green with them. Re-run
  `npm run spec:names` after any edit that moves the `it(` lines.

## Out of scope

- The audit entry or billing record itself — a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape — providers populate it; the engine only aggregates.
- The `instanceof Error` gate in the same `catch` (own issue, #95's ground).
- Reworking `lastUsage`'s use inside the round loop beyond what the sum needs.