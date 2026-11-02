# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator(provider, promptBuilder, undefined, {hooks}).processMessage(session)` is the real entry point, and a throwing `beforeSession` is installed through `hooks` today.

## Done when these pass

- [ ] **reaches onError with the same session and error, and the caller still gets the rejection** — a `beforeSession` that throws must reach `onError` with the session and the thrown error, and the caller still sees the rejection.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **still runs afterSession, so a hook can release what beforeSession allocated** — a `beforeSession` that throws must still run `afterSession`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `processMessageStream` (`src/orchestration/chatOrchestrator.ts`), so `onError` and `afterSession` run for its throw.
- [ ] Decide and record in `specs/hal-engine-config-hooks/spec.md` whether `afterSession` after a failed `beforeSession` means "never allocated" or "allocated and finished", and what a hook can assume about how much of the turn happened. Replace the recorded-flaw line for `beforeSession` with the new guarantee and link the two tests above to it.
- [ ] Add a CHANGELOG entry under Unreleased saying `onError` and `afterSession` now run when `beforeSession` throws, and what that means for an existing consumer.

## Out of scope

- The `error instanceof Error` gate on `onError` (its own issue; the spec's second recorded flaw stays as it is).
- Usage accounting across tool rounds (HALEngine#93).
- Any change to the spec's `Status` row.
- The spec's `[validated by]` link for the new guarantee: the statement it would link to does not exist until the spec change above is made, so it is not linked in this round.