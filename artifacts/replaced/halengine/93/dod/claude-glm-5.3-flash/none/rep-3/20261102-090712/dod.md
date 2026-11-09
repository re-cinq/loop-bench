# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier
> rounds — including the one carrying the customer's question and the full tool
> results — are not counted anywhere. A deployer billing or budgeting from this
> hook under-counts exactly the expensive turns, and nothing in the signature
> hints at it.

**Strategy: `direct`** — the seam already exists: `afterModelResponse` is a public
hook and the repo's own `scriptedProvider` idiom drives the tool loop round by
round, so the acceptance tests call `createChatOrchestrator` with known per-round
token counts and fail on today's last-round-only usage. No doubles needed.

Run them with the repo's ESM jest invocation (a bare `npx jest` cannot load the
suite):

    node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.usage.acceptance.test.ts

## Done when these pass

- [ ] **reports the usage of every provider call in a two-round tool turn, not
      only the last** — rounds report {100,10,110} then {20,5,25}; the hook must
      receive one invocation carrying {120,15,135}. RED today: it receives
      {20,5,25}, the final provider call alone.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still counts the rounds that reported usage when a round between them
      reports none** — a silent middle round must be skipped, not poison the total
      with `undefined`/`NaN`. RED today for the same under-count.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **still reports nothing when no round in the turn reported usage** — a turn
      where nothing reported keeps reporting `undefined`. GREEN today by design: it
      is the guard for the second half of acceptance criterion 3, which no existing
      test pins; it must stay green through the change.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`
- [ ] **`receives collected response text and usage`** — the EXISTING test in
      `src/orchestration/chatOrchestrator.test.ts` must remain UNEDITED and green:
      a no-tool turn reports exactly what it reports today (acceptance criterion 2).
      `keeps the usage an earlier round reported when a later round reports none`
      in the same file must also stay green — it is consistent with summing, since a
      later silent round adds nothing.

## Facets

- [ ] Accumulate the per-round usage in `chatOrchestrator.ts` so the
      `afterModelResponse` call site passes the turn's total: sum each field over the
      rounds that reported, skip the rounds that did not, and pass `undefined` when
      none did. Keep the hook firing once per user message.
- [ ] Decide the signature shape — one summed `usage` argument, or the total plus
      a per-round breakdown beside it — record on the issue why the rejected shape
      lost, and make the `OrchestratorHooks` declaration say the answer (param name
      and its one-line doc comment) so a reader need not open the orchestrator
      (acceptance criterion 4; judged on the diff, not by a test). The red tests
      above assert only on the `usage` argument, which both shapes share. MINOR
      version bump, per repo breaking-change rules.
- [ ] In `specs/hal-engine-config-hooks/spec.md`, replace the under-counting
      bullet in "Measured semantics — out of scope" with the new behaviour as a
      cited statement, e.g. `([validated by: reports the usage of every provider
call in a two-round tool turn, not only the
last](../../src/orchestration/chatOrchestrator.usage.acceptance.test.ts#Lnn))`,
      repointing `#Lnn` with `npm run spec:names:fix`; this spec has no
      `scripts/spec-links/reanchor.mjs`. Leave the `instanceof Error` bullet in that
      section alone.
- [ ] Add a `[Unreleased]` `### Changed` CHANGELOG entry stating the change in
      what an existing consumer records for tool-heavy turns.

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern; token
  accounting for anything other than the provider calls the orchestrator makes;
  the `stop` chunk's own `usage` shape (ticket tech notes).
- What a no-tool turn reports — it must not move, and is pinned by the unedited
  existing test above.
- The other recorded semantics bullet in the same spec section (the `catch`
  gating `onError` on `error instanceof Error`) — a separate out-of-scope change
  owned by no issue in this epic.