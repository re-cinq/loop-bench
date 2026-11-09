# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage`
> local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so
> what the hook receives is the usage of the final provider call alone. [...] A deployer billing or
> budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature
> hints at it.

**Strategy: `direct`** — the seam is `OrchestratorHooks.afterModelResponse` itself. The acceptance
tests install a real hook through `createChatOrchestrator`, drive a scripted provider through two and
three tool rounds with known, different per-round token counts, and assert what the hook was handed.
They are red today because the hook receives the last reporting round's usage alone and no breakdown
at all — exactly the ticket's claim. Red run: `2 failed, 2 total`, both on their own `toEqual`
assertions, the received `total` being the final call's usage (`45/30/75` where the sum `165/38/203`
was expected). The design the tests pin (and the reason the ticket's other shape is rejected): the
third argument stays a bare `UsageMetadata` holding the turn's **sum**, and a fourth argument
`rounds?: UsageMetadata[]` carries the per-call breakdown. A wrapper object (`{total, rounds}`) is
rejected because the ticket pins a no-tool turn to "exactly what it reports today, pinned by the
existing test remaining unedited", and that unedited test asserts the third argument equals the
round's usage; a pure single-sum signature is rejected because the ticket requires the type itself to
say the answer, which a lone `usage?: UsageMetadata` does not.

## Done when these pass

- [ ] **reports usage covering every provider call of a two-tool-round turn** — a turn driven through
  two tool rounds, whose scripted rounds report 120/8/128 and 45/30/75 tokens, hands the hook the sum
  165/38/203 as its third argument and both rounds' usage, in order, as its fourth.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts only the rounds that reported usage, and reports no total when none did** — a
  three-round turn where the middle round reports no usage still sums the two that reported
  (30/6/36, not `undefined`, not `NaN`, not just the last round), and a turn whose rounds report no
  usage anywhere still reports no total, with an empty breakdown.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the ticket pins a no-tool turn to exactly
  today's report by the existing test remaining unedited; it must stay green, and it does today
  (quoted in the round report). `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, accumulate instead of overwrite: sum
  `inputTokens`/`outputTokens`/`totalTokens` over the rounds that reported usage; leave the total
  `undefined` when none reported; keep a `UsageMetadata[]` of the reporting rounds in order. Both
  tests above go green; the no-tool path is untouched because one reported round sums to itself.
- [ ] Widen the hook type in the same file:
  `afterModelResponse?: (session, responseText, turnUsage?: UsageMetadata, rounds?: UsageMetadata[]) => Promise<void>`
  with a one-line doc comment stating the third argument is the turn's sum across every provider call
  (comments are single-line here; `re-lint/max-comment-lines`). Renaming the parameter is free —
  names do not affect assignability — and it is what makes the answer visible at the point of use.
- [ ] Update the mirrored interface listings the type change leaves stale: the hook block in
  `CLAUDE.md`, the interface block in `specs/hal-engine-architecture/spec.md` (~L199), and the
  `example/` hook consumers only if the rename reaches them (it should not; they consume fewer
  arguments than the hook passes).
- [ ] `CHANGELOG.md`: a **Changed** entry under `[Unreleased]` stating the behaviour change in what an
  existing consumer records — the number grows for tool-heavy turns — with a migration note.
  `scripts/check-changelog.sh` only fires once the non-test `src/` edit lands, i.e. this round. The
  MINOR bump itself happens at release, with the other `[Unreleased]` entries (`check-version.sh`
  gates the tag, not the PR).
- [ ] `specs/hal-engine-config-hooks/spec.md` already carries the new behaviour, written ahead of the
  code and citing the acceptance tests at #L64/#L94: verify the wording still matches what landed
  rather than rewriting it. `npm run spec:names` and `node scripts/repoint-spec-anchors.mjs --check
  origin/main` hold the citations to the test names and lines.
- [ ] Run the two acceptance tests plus the pinned existing test — not the whole suite:
  `node --experimental-vm-modules node_modules/jest/bin/jest.js
  src/orchestration/chatOrchestrator.acceptance.test.ts src/orchestration/chatOrchestrator.test.ts`

## Out of scope

- The audit entry or billing record itself — a consumer's concern (ticket tech notes).
- Token accounting for anything other than the provider calls the orchestrator makes, and the `stop`
  chunk's own `usage` shape, which providers already populate (ticket tech notes).
- The no-tool turn's report moving: it must not (pinned by the unedited existing test, and cited in
  the spec's third bullet).
- The `lastUsage`-in-a-later-round fallback semantics that two existing tests pin
  (`chatOrchestrator.test.ts` "keeps the usage an earlier round reported…" and `toolBudget.test.ts`
  "hands afterModelResponse text ending in the sentence…"): the sum over *reporting* rounds returns
  the same values they assert, so they stay green unedited — if an implementation choice breaks them,
  that is a design fault, not a test to edit.