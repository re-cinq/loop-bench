# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` and its `hooks` option are the real seam, and the tests drive `processMessage` with a `beforeSession` that throws. No new seam is needed.

The red bar is CI's to show in this pod's run: the tests run in the Jest suite (`hal-engine-jest`, `.lore/test-commands.yml`). CI runs them on every push as the "Test" step of `.github/workflows/ci.yml` (`npm run test:coverage`).

## Done when these pass

- [ ] **calls onError with the session and the thrown error, and the caller still sees the rejection** — a `beforeSession` throw reaches `onError` with the same session object and the thrown `Error`; the rejection still reaches the caller unchanged.
  `src/orchestration/beforeSessionThrow.acceptance.test.ts`
- [ ] **calls afterSession even though beforeSession threw** — `afterSession` fires for a `beforeSession` throw, so a deployer can release what it allocated.
  `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`, so a throw reaches the same `catch` and `finally` as any other failure in the turn.
- [ ] Decide and record in `specs/hal-engine-config-hooks/spec.md` whether `afterSession` after a failed `beforeSession` means "never allocated" or "allocated and finished"; replace the recorded-flaw bullet with the new guarantee and what a hook can assume.
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer (`onError` and `afterSession` now fire for a `beforeSession` throw).
- [ ] Add the `validated by` links on the new spec statements once the tests pass.

## Out of scope

- The `error instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Non-throwing `beforeSession` behaviour: already pinned by the existing `ChatOrchestrator hooks` tests in `src/orchestration/chatOrchestrator.test.ts`, which must stay unedited.
- The spec `Status` row: not changed by this round.