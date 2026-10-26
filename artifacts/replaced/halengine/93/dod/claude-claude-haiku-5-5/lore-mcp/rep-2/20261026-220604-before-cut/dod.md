# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` with an `afterModelResponse` hook is called through `processMessage`, and a scripted `AIProvider` defined in the test file can report known per-round usage. The tests run against the real orchestrator and fail on the value the hook receives today.

## Done when these pass

- [x] **reports the sum of every provider call in a turn that ran two tool rounds** — a turn with two tool rounds and a final text round, reporting 100/150/210 input and 20/30/40 output tokens, hands `afterModelResponse` usage equal to the sum (460 in, 90 out, 550 total), not the final round's 210/40/250.
      `src/orchestration/turnUsage.acceptance.test.ts`

- [x] **counts the rounds that reported usage when an earlier round reports none** — a middle round with no usage is skipped, and the hook receives the sum of the rounds that did report (310 in, 60 out, 370 total), not the final round alone.
      `src/orchestration/turnUsage.acceptance.test.ts`

## Facets

- [x] Accumulate usage across every provider call in `processMessageStream` and pass the sum as the `afterModelResponse` usage argument (one argument kept, per the ticket's first option); a round with no usage adds nothing, and a turn where no round reported still passes `undefined`.
- [x] Make the type say it is a sum: rename the hook's third parameter's type so a reader does not need the orchestrator to learn it is a total (no `any` in the public API).
- [x] Replace the under-counting bullet in `specs/hal-engine-config-hooks/spec.md` with the new behaviour, and link it to the tests above once they are green.
- [x] Add a CHANGELOG entry under Unreleased > Changed stating that `afterModelResponse` now reports the total across tool rounds, so an existing consumer's recorded number grows for tool-heavy turns (MINOR bump, migration note).
- [x] Confirm the existing test `keeps the usage an earlier round reported when a later round reports none` and `receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts` stay unedited and green (a turn with no tool calls reports exactly what it reports today).

## Out of scope

- The audit entry or billing record itself; that is a consumer's concern.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape; providers already populate it and this ticket only aggregates it.
- Passing a per-round breakdown alongside the total ("pass both"). Rejected for this ticket: it widens the public surface and the ticket asks for the smaller shape unless a consumer needs granularity, which no one has asked for.
- The runtime type-level check for the renamed parameter type (not expressible as a Jest runtime assertion; covered by the build and typecheck in CI).