# Definition of Done

> "`chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. … A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it."

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator`'s `hooks.afterModelResponse` is the real entry point, a scripted provider drives the tool loop round by round (the established idiom in `src/orchestration/chatOrchestrator.test.ts`), and the acceptance tests call it today and fail on behaviour. No production code is needed to make the tests runnable; they are red because the behaviour is absent.

The shape this DoD pins, deciding the ticket's "two shapes" question: **pass both** — `usage` stays the third argument and becomes the turn total, and a fourth argument carries the per-round breakdown (`UsageMetadata[]`, one entry per provider call that reported usage, in round order; `[]` when none reported). Shape A (accumulate into the lone `usage`) is rejected because it cannot satisfy the ticket's own fourth criterion: the type after that change is identical to today's `UsageMetadata | undefined`, so a reader still cannot tell from the signature whether the number is a sum. A fourth argument named `rounds`, sitting beside `usage`, makes the answer unambiguous without moving the common path (the third argument of a no-tool turn is byte-for-byte what it is today, which the existing unedited test pins).

## Done when these pass

- [ ] **reports the usage of every provider call in the turn, summing two tool rounds that reported different counts** — a two-round tool turn against a scripted provider reporting `{100,10,110}` then `{200,20,220}` hands the hook the sum `{300,30,330}` as `usage` and `[first, second]` as the breakdown; today it hands the last round alone
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported usage, and reports nothing when no round did** — a silent round contributes nothing rather than poisoning the total with `undefined`/`NaN`, and a turn where no round reported still reports nothing (`usage` undefined, breakdown `[]`)
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`
- [ ] **hands a turn with no tool calls exactly the usage it reports today** — the common path is unchanged in the widened signature: `usage` is exactly the provider's reported object and the breakdown has that single call
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`

Run exactly these with:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/afterModelResponseUsage.acceptance.test.ts
```

CI (the `Verify` job in `.github/workflows/ci.yml`, step "Test (with coverage floor)" running `npm run test:coverage`) is the judge of the branch and runs the whole suite on every push.

Criterion 4 of the ticket — the type says the answer — is not runtime-observable: the three tests pin the shape and position of what arrives, and CI's "Type check" step (`npm run typecheck`) plus the zero-warning lint hold the signature to it (`rounds?: UsageMetadata[]`, no `any`). The hook literals in the acceptance file declare that fourth optional argument today; ts-jest runs them fine, and if the "Type check" step flags them before the interface gains the argument, that red disappears with the fix and is expected, not a mistake in the tests.

## Facets

- [x] Acceptance tests written and red for the ticket's claim (the first fails on the under-counted total itself, receiving `200/20/220` where the sum `300/30/330` is owed)
- [x] `specs/hal-engine-config-hooks/spec.md`: the recorded under-counting line is replaced by the new behaviour under "Usage the afterModelResponse hook receives", citing the three tests; the section intro now covers only the remaining recorded property (`catch` gating `onError`)
- [ ] Replace the `lastUsage` local in `src/orchestration/chatOrchestrator.ts` with the turn total: sum the rounds that reported, keep `usage` as the third argument — turns the first and second tests green
- [ ] Add the fourth hook argument (per-round breakdown, `UsageMetadata[]`, `[]` when none reported) to `OrchestratorHooks.afterModelResponse`, named so the signature reads (`usage` = turn total, `rounds` = per-round breakdown), no `any` — completes all three tests
- [ ] Leave the existing test `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` unedited and green — the ticket's criterion 2 pins it; the neighbouring `keeps the usage an earlier round reported when a later round reports none` also stays green unedited, because a silent round leaves the sum equal to the reporting round
- [ ] `CHANGELOG.md`: a `### Changed` entry under `## [Unreleased]` stating the change in what an existing consumer records (the number grows for tool-heavy turns) with a migration note, as a MINOR bump per the breaking-changes policy — CI's "Changelog entry" step fails the PR without it
- [ ] Regenerate the generated `OrchestratorHooks` blocks in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md` with `npm run docs:fix` once the signature changes — CI's "Documented code blocks" step compares them to source

## Out of scope

- The audit entry or billing record itself — a consumer's concern (ticket tech notes)
- Token accounting for anything other than the provider calls the orchestrator makes, including the `UsageStore` seam (`src/types/usageStore.ts`) (ticket tech notes)
- The `stop` chunk's own `usage` shape, which providers already populate (ticket tech notes)
- The remaining recorded property — the `catch` gating `onError` on `error instanceof Error` — stays under "Measured semantics — out of scope", owned by no issue
- Rephrasing `specs/hal-engine-architecture/spec.md`'s "Usage an earlier round reported is kept when a later round reports none" — the statement stays true and its test green under the sum; an optional prose touch, not owed