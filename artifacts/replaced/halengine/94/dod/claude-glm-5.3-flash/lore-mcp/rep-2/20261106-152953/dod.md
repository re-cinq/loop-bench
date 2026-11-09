# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator`'s own public API. A test can install a throwing `beforeSession` through `ChatOrchestratorOptions.hooks` today, call the real `processMessage`, and observe today's silence, so the red bar is the missing hook firing and not a missing module. No doubles: a hand-written provider object and the real `PromptBuilder` are the repo's own idiom for exercising this entry point (`src/orchestration/chatOrchestrator.test.ts` does the same).

## Done when these pass

- [ ] **fires onError with the session and the thrown error, and still rejects** — a throw from `beforeSession` reaches `onError` with the same session and the same `Error` instance the `catch` hands every other failure, while the caller still receives the identical rejection (so a fix cannot swallow the error to make the hooks fire)
  `src/orchestration/beforeSessionThrow.acceptance.test.ts`
- [ ] **runs onError then afterSession on a session that never reached the provider** — the whole `finally` runs on this path: `afterSession` follows `onError`, no lifecycle hook between `beforeSession` and them fires, the provider is never called, and the session entries are exactly as the caller left them
  `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move the `hooks.beforeSession` call at the top of `processMessageStream` inside the `try` in `src/orchestration/chatOrchestrator.ts`, so the existing `catch`/`finally` cover it; no other production change is owed. Note `commitStreamingEntries` and `saveSession` (the same `finally`) then also run on this path, which the tests above imply rather than pin.
- [ ] `specs/hal-engine-config-hooks/spec.md` already carries the replacement on this branch: the recorded-flaw bullet is deleted, a new "Error path of the lifecycle" section states the guarantee and the after-a-failed-beforeSession assumption, citing these two tests; the "Measured semantics — out of scope" intro is renumbered to two properties. Verify it reads right after the code change; do not re-litigate the decision — `afterSession` firing after a failed `beforeSession` is the contract, and the "turn never started" sentence is the answer the ticket asked to be recorded.
- [ ] After editing `chatOrchestrator.ts`, run `node scripts/repoint-spec-anchors.mjs`: the two remaining out-of-scope anchors (`chatOrchestrator.ts#L150`, `#L148`) shift when the `beforeSession` line moves inside the `try`. This spec's anchor set now differs from `origin/main`, so the script skips it whole and the shift has to be corrected by hand or by `node scripts/check-spec-anchor-names.mjs --fix`.
- [ ] Add a `CHANGELOG.md` `## [Unreleased]` entry written for an existing consumer: `onError`, `afterSession` and the session save now run after a failed `beforeSession`, where before they were silently skipped.
- [ ] The existing hook tests stay green and unedited, pinning that a non-throwing `beforeSession` behaves exactly as today: `src/orchestration/chatOrchestrator.test.ts` (notably "called before anything else", "error path calls onError then afterSession", "calls all hooks in correct order") and `src/config.test.ts` (the lifecycle-order and forwarding tests).

## Out of scope

- The `instanceof Error` gate on `onError` in the same `catch` — its own issue.
- Usage accounting across tool rounds (`afterModelResponse` receives the last round's usage, not a sum) — HALEngine#93.
- Whether `saveSession` persisting a session whose `beforeSession` threw is the wanted retention behaviour; the ticket decides hook semantics, and the save is implied by "the same `finally`" without being named by any acceptance criterion.